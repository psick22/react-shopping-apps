const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require('../models/Product');
//=================================
//             Product
//=================================
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalName}`);
  },
});

var upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
  // 가져온 이미지 (req) 를 저장
  upload(req, res, err => {
    if (err) {
      return res.json({ success: false, err });
    }

    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
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
  // DB에 저장된 모든 상품 정보를 불러옴
  Product.find()
    .populate('writer')
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, productInfo });
    });
});
module.exports = router;
