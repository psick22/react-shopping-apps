const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//=================================
//             Product
//=================================

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shopping-app',
    format: 'png',
    public_id: (req, file) => {
      `${Date.now()}_${file.originalname}`;
    },
  },
});

const upload = multer({ storage: storage }).single('file');

// 이미지 파일 png로
router.post('/image', (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      fileName: res.req.file.filename,
      filePath: res.req.file.path,
    });
  });
});

router.post('/', (req, res) => {
  // 받아온 상품 정보를 DB에 저장
  const product = new Product(req.body);
  product.save(err => {
    if (err) res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/products', (req, res) => {
  const limit = req.body.limit ? parseInt(req.body.limit) : 20;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};

  for (let category in req.body.filters) {
    console.log('category', category);
    if (req.body.filters[category].length > 0) {
      // 리스트 안에 필터 조건이 있을 때
      if (category === 'price') {
        findArgs[category] = {
          //$gte: greater than equal, $lte: less than equal
          // mongo DB 명령어
          $gte: req.body.filters[category][0].minPrice,
          $lte: req.body.filters[category][0].maxPrice,
        };
      } else {
        findArgs[category] = req.body.filters[category];
      }
    }
    console.log('findArgs :', findArgs);
  }
  //search 가 있다면

  if (req.body.searchString) {
    console.log(req.body.searchString);
    Product.find(findArgs)
      .find({ $text: { $search: req.body.searchString } })
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo: productInfo,
          postSize: productInfo.length,
        });
      });
  } else {
    // DB에 저장된 모든 상품 정보를 불러옴
    Product.find(findArgs)
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo: productInfo,
          postSize: productInfo.length,
        });
      });
  }
});

router.get('/products_by_id', (req, res) => {
  // productID를 이용해서 DB에서 일치하는 상품의 정보를 불러옴

  // query로 전달했기 때문에 req.body 가 아닌 req.query

  let type = req.query.type;
  let productID = req.query.id;
  Product.find({ _id: productID })
    .populate('writer')
    .exec((err, product) => {
      if (err) return res.status(400).send({ success: false, err: err });
      return res.status(200).send({ success: true, product: product });
    });
});

module.exports = router;
