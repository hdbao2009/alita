let authModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

module.exports = {
	list: (req, res) => {
		authModel.find()
			.select()
			.exec()
			.then(result => {
				res.status(200).json({
          count: result.length,
          result,
					message: result > 0 ? 'Get All List Tags' : 'Not List Tags'
				})
			}).catch(err => {
				res.status(500).json({
					message: '',
					error: err
				})
			});
  },
  
  create: (req, res) => {
    let auth = new authModel(req.body);
    auth.save().then(result => {
      res.status(200).json({
        status: 1,
        message: 'Create auth successfully'
      })
    }).catch(err => {
      res.status(500).json({
				message: 'Error when creating auth',
				error: err
			});
    })
  },

  login: (req, res) => {
    if(req.body.username === 'hdbao2009@gmail.com' && req.body.password === '1') {
      const token = jwt.sign(
        {
          ten: "Huynh Dinh Bao",
        }, 
        'hdbao2009@gmail.com', 
        {algorithm: 'HS256'}
      );
      res.json({
        status: 1,
        access_token: token
      });
    } else {
      res.send('Dang nhap that bai')
    }
  }
}