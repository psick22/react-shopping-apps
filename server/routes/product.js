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
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;

  // DB에 저장된 모든 상품 정보를 불러옴
  Product.find()
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, productInfo });
    });
});

module.exports = router;
