let categoriesModel = require('../models/categoriesModel');
let postsModel = require('../models/postsModel');
let en_point = require("../constant");

module.exports = {
	list: (req, res) => {
		categoriesModel.find()
			.select()
			.exec()
			.then(result => {
				res.status(200).json({
					count: result.length,
					message: result.length > 0 ? 'Get All List Categories' : 'Not List Categories',
					result
				})
			}).catch(err => {
				res.status(500).json({
					message: '',
					error: err
				})
			});
	},

	// Get Tag by id
	getCategoryById: (req, res) => {
		let id = req.params.id;
		categoriesModel.findById(id)
			.select()
			.exec()
			.then(result => {
				if (result) {
					res.status(200).json({
						result
					})
				} else {
					res.status(404).json({
						message: 'Not valid entry found for provider ID',
						error: err
					})
				}
			}).catch(err => {
				res.status(500).json({
					message: '',
					error: err
				})
			});
	},

	create: (req, res) => {
		let category = new categoriesModel(req.body);
		category.save()
		.then(result => {
			res.status(200).json({
				message: 'Created Category Successfully',
				success: result,
				status: 1
			});
		}).catch(error => {
			res.status(500).json({
				status: 1,
				code: 'errUnique',
				error: error.errmsg
			})
		});
	},

	// Delete category by Id
	deleteCategoryById: (req, res) => {
		let id = req.params.id;
		categoriesModel.remove({_id: id})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Category Successfully',
				status: 1
			})
		}).catch(err => {
			res.status(500).json({
				message: '',
				error: err
			})
		});
  },

  getListPostsByCateId: (req,res)=>{
    let id = req.params.id;
    let listFilter = [];
    postsModel.find().then(posts => {
      posts.forEach((element,index)=>{
        if(element.idCategory == id) {
          listFilter.push(element); return;
        } 
      })
      res.status(200).json({
        count: listFilter.length,
        message: 'list Posts after filter by category ID',
				success: listFilter,
				status: 1
      })
    }).catch(err => {
      res.status(500).json({
        message: '',
        error: err
      })
    });
  }
}