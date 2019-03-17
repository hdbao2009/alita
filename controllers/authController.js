let authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const config = require('../constant');
const bcrypt = require('bcryptjs');

module.exports = {
	list: (req, res) => {
    authModel.find()
      .select()
      .exec()
      .then(result => {
        res.status(200).json({
          count: result.length,
          result,
          message: result.length > 0 ? 'Get All List Tags' : 'Not List Tags'
        })
      }).catch(err => {
        res.status(500).json({
          message: '',
          error: err
        })
      });
  },

  register:(req, res) => {
    authModel.find({email: req.body.email})
    .then(user => {
      if(user.length > 0) {
        return res.status(200).json({
          message: 'Auth exists'
        })
      }
      bcrypt.hash(req.body.password, 10,(err,hash) => {
        if(err) {
          return res.status(500).json({
            error: err
          })
        }
        const auth = new authModel({
          email: req.body.email,
          password: hash
        })
        auth.save().then(result => {
          res.status(200).json({
            status: 1,
            result,
            message: 'Create auth successfully'
          })
        }).catch(err => {
          res.status(500).json({
            message: 'Error when creating auth',
            error: err
          });
        })
      }) 
    })

  },

  login: (req, res) => {
    authModel.find({email: req.body.email})
    .then(user => {
      if(user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if(result) {
          const token = jwt.sign({
              email: user[0].email,
              _id: user[0]._id
            }, 
            config.PRIMARY_KEY, 
            {algorithm: 'HS256'}
          );
          return res.json({
            status: 1,
            access_token: token
          });
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
  }
}