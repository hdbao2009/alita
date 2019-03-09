const jwt = require('jsonwebtoken');

var verifyAccessToken = (req, res, next) => {
  console.log(req.headers);
  
  if(req.header && req.headers.authorization && req.headers.authorization.split(' ')[0].toLowerCase() === 'bearer') {
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'hdbao2009@gmail.com', (error, decode) => {
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