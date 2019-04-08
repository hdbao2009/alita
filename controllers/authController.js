let authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');
const config = require('../constant');
const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    try {
      let checkEmailHaveExitst = await authModel.find({email: req.body.email});
      if(checkEmailHaveExitst.length > 0) {
        return res.status(200).json({
          message: 'Auth exists'
        })
      }
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      let auth = new authModel({
        email: req.body.email,
        password: hashPassword,
        fullname: req.body.fullname,
        role: req.body.role
      })
      let createAuthor = await auth.save();
      res.status(200).json({
        status: 1,
        createAuthor,
        message: 'Create auth successfully'
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  login: async (req, res) => {
    try {
      let checkAuthorExistsOnDB = await authModel.find({email: req.body.email});
      if(checkAuthorExistsOnDB.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      let checkHashPassword = await bcrypt.compare(req.body.password, checkAuthorExistsOnDB[0].password);
      if(checkHashPassword) {
        const token = jwt.sign({
          email: checkAuthorExistsOnDB[0].email,
          _id: checkAuthorExistsOnDB[0]._id
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
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  list: async (req, res) => {
    try {
      let listAuthor = await authModel.find().select();
      res.status(200).json({
        count: result.length,
        listAuthor,
        message: result.length > 0 ? 'Get All List Tags' : 'Not List Tags'
      })
    } catch (error) {
      res.status(500).json({
        message: '',
        error: error
      })
    }
  },

  delete: async (req, res) => {
    try {
      let deleteOneAuthor = await authModel.deleteOne({_id: req.params.id});
      if(deleteOneAuthor.deletedCount > 0) {
        return res.status(200).json({
          status: 1,
          deletedCount: deleteOneAuthor.deletedCount,
          message: "Delete author complete"
        })
      } 
      res.status(200).json({
        status: 1,
        deletedCount: deleteOneAuthor.deletedCount,
        message: "Author not exists"
      })
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  },

  update: async (req, res) => {
    try {
      let checkAuthor = await authModel.find({_id: req.params.id}).exec();
      if(checkAuthor.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      let checkHashPassword = await bcrypt.compare(req.body.passCurrent, checkAuthor[0].password);
      if (checkHashPassword) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        let doUpdateAuthor = await authModel.update({_id: req.params.id}, {$set: req.body}).exec();
        return res.status(200).json({
          doUpdateAuthor,
          status: 1,
          message: "Update password completed"
        })
      } 
      res.status(200).json({
        status: 0,
        message: "email or password not correct"
      })
      
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }
  }
}