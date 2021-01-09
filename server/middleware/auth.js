const { User } = require('../models/User');

let auth = (req, res, next) => {
  // NOTE 쿠키속에 담겨있는 token을 이용해서 유저 정보가 있다면 유저 정보를 가져와서
  // 토큰과 유저 정보를 req.user, req.token 에 붙여서 전달해주는 미들웨어

  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
