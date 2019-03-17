const jwt = require('jsonwebtoken');
const config = require('../constant');

var verifyAccessToken = (req, res, next) => {
  if(req.header && req.headers.authorization && req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, config.PRIMARY_KEY, (error, decode) => {
      if(error) {
        return res.status(403).json({
          message: 'Token invalid' 
        })
      }
      return next();

    })
  } else {
    return res.status(403).json({
      message: 'Unauthorization'
    })
  }
}

module.exports = verifyAccessToken;