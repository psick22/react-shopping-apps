const express = require('express');
const multer = require('multer');
const router = express.Router();
const { Product } = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: 'psick22',
  api_key: '542886794659432',
  api_secret: 'l7KU0A7-nJDnQ2Kkg2Li3h3pK9o',
});
//=================================
//             Product
//=================================
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'some-folder-name',
    format: 'png',
    public_id: (req, file) => {
      `${Date.now()}_${file.originalname}`;
    },
  },
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalName}`);
//   },
// });
const upload = multer({ storage: storage }).single('file');
router.post('/image', upload, function (req, res) {
  res.json({
    success: true,
    fileName: req.file.filename,
    filePath: req.file.path,
  });
});

// router.post('/image', (req, res) => {
//   // 가져온 이미지 (req) 를 저장

//   console.log(storage);
//   upload(req, res, err => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({
//       success: true,
//       // filePath: res.req.file.path,
//       // fileName: res.req.file.filename,
//     });
//   });
// });

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
