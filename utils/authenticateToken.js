const jwt = require('jsonwebtoken')
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY_JWT;

module.exports = function authenticateToken(req, res, next) {
  const cookies = req.cookies
  console.log(cookies)
  const token2 = Object.keys(req.cookies)[1]
  // console.log(req.cookies[1])
  // console.log(token2)
  // const authHeader = req.headers.authorization
  // console.log(authHeader)
  // if (!authHeader) {
  //   return res.status(401).json({
  //     error: 'not authenticated'
  //   });
  // }

  // const token = authHeader.split(' ')[1];
  console.log({token2})
  jwt.verify(token2, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      // return res.status(403).json({
      //   error: 'not authorized'
      // });
      return res.redirect('/user/login')
    }
    console.log(decoded.data)
    req.user = decoded.data;
    next();
  }); 
};

