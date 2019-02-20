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
					message: result > 0 ? 'Get All List Categories' : 'Not List Categories',
					categories: result.map(category => {
						return {
							category,
							requestGET: {
								type: 'GET',
								url: en_point.link.Categories + category._id
							}, 
							requestDEL: {
								type: 'DELETE',
								url: en_point.link.Categories + category._id
							}
						}
					})
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
						success: result,
						request: {
							type: 'GET',
							url: en_point.link.Categories
						}
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
				requestALL: {
					type: 'GET',
					url: en_point.link.Categories
				},
				requestGET: {
					type: 'GET',
					url: en_point.link.Categories + result._id
				}
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
				request: {
					type: 'POST',
					url: en_point.link.Categories,
					body: {
						name: 'String'
					}
				}
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
          console.log(element);
          listFilter.push(element); return;
        } 
      })
      res.status(200).json({
        count: listFilter.length,
        message: 'list Posts after filter by category ID',
        success: listFilter.map(post => {
          return {
            post,
            request: { type: 'GET', url: en_point.link.Posts + post._id }
          }
        })
      })
    }).catch(err => {
      res.status(500).json({
        message: '',
        error: err
      })
    });
  }
}