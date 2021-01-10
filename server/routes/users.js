const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Product } = require('../models/Product');

const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    hitstory: req.user.history,
  });
});

router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: 'Wrong password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('w_authExp', user.tokenExp);
        res.cookie('w_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '', tokenExp: '' },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    },
  );
});

// 장바구니 담기
router.post('/addToCart', auth, (req, res) => {
  // NOTE 1. user collection에서 해당 유저의 데이터를 가져옴
  // console.log('auth 통과 user id:', req.user);

  User.findOne(
    { _id: req.user._id }, // auth 미들웨어를 통과해올때 유저 정보를 쿠키로부터 받아서 req.user에 넣어서 전달됨

    (err, userInfo) => {
      if (err) {
        console.log('add to cart 실패');
        return res.status(400).json({ success: false, err, 1: 1 });
      } else {
        // console.log('add to cart 성공', req.body);
        // NOTE 2. 가져온 정보에서 카트에 넣으려하는 상품이 이미 들어있는지 확인
        // user 스키마에서 cart 필드는 리스트로서 카트에 담은 상품의 오브젝트를 나타내기 때문에 cart 리스트의 모든 상품의 id가 productID 와 일치하는지 확인
        let duplicate = false;

        userInfo.cart.forEach(item => {
          if (item.id === req.body.productId) {
            // productID : addToCart action의 body에서 받아온 정보
            duplicate = true;
          }
        });
        // NOTE 2.1 동일한 상품이 있다면 갯수 1 증가
        if (duplicate) {
          User.findOneAndUpdate(
            {
              _id: req.user._id,
              'cart.id': req.body.productId, // NOTE 따옴표 붙이는 이유는 오벡트내의 오브젝트를 가리킬때 mongoDB dot notation 규칙임
            },
            { $inc: { 'cart.$.quantity': 1 } },
            { new: true },
            (err, userInfo) => {
              if (err) return res.status(400).json({ success: false, err });
              return res.status(200).send(userInfo.cart);
            },
          );
        }

        // NOTE 2.2 동일한 상품이 없다면 상품정보 오브젝트를 전달 (상품 id, 갯수, 날짜)
        else {
          User.findOneAndUpdate(
            { _id: req.user._id },
            {
              $push: {
                cart: { id: req.body.productId, quantity: 1, date: Date.now() },
              },
            },
            { new: true },
            (err, userInfo) => {
              if (err) return res.status(400).json({ success: false, err });
              return res.status(200).send(userInfo.cart);
            },
          );
        }
      }
    },
  );
});

// req.query.id = productId

router.get('/removeFromCart', auth, (req, res) => {
  // auth 에서 user 아이디 (req.user._id) 를 받아서 DB에서 이 아이디와 일치하는 유저를 찾고
  // 유저의 cart 정보에서 받아온 productId와 일치하는 정보를 삭제

  User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { cart: { id: req.query.id } } },
    { new: true },
    (err, userInfo) => {
      // cartDetail 스토어의 정보도 리프레쉬해야하기 때문에
      // product collection 에서 남아있는 상품 정보를 다시 가져와야함
      let cart = userInfo.cart;
      let array = cart.map(item => {
        return item.id;
      });

      Product.find({ _id: { $in: array } })
        .populate('writer')
        .exec((err, productInfo) => {
          return res
            .status(200)
            .json({ success: true, productInfo: productInfo, cart: cart });
        });
    },
  );
});

router.post('/successBuy', auth, (req, res) => {
  // NOTE 1. user collection 의 history 필드에 간단한 결제 정보 넣어줌
  let history = [];
  let transactionData = {};
  req.body.cartDetail;

  // NOTE 2. payment collection 에 결제 상세 정보 넣어줌
  // NOTE 3. product collection 의 sold 필드 정보 업데이트 (quantity 만큼 increase)
});

module.exports = router;
