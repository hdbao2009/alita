let tagsModel = require('../models/tagsModel');
let postsModel = require('../models/postsModel');
let en_point = require("../constant");

module.exports = {
	list: (req, res) => {
		tagsModel.find()
			.select()
			.exec()
			.then(result => {
				res.status(200).json({
					count: result.length,
					message: result.length > 0 ? 'Get All List Tags' : 'Not List Tags',
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
	getTagById: (req, res) => {
		let id = req.params.id;
		tagsModel.findById(id)
			.select()
			.exec()
			.then(result => {
				if (result) {
					res.status(200).json({
						success: result,
						request: {
							type: 'GET',
							url: en_point.link.Tags
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
		let tags = new tagsModel(req.body);
		tags.save()
		.then(result => {
			res.status(200).json({
				message: 'Created Tags Successfully',
				success: result,
				requestALL: {
					type: 'GET',
					url: en_point.link.Tags
				},
				requestGET: {
					type: 'GET',
					url: en_point.link.Tags + result._id
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

	// Delete tag by Id
	deleteTagById: (req, res) => {
		let id = req.params.id;
		tagsModel.remove({_id: id})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Deleted Tag Successfully',
				result,
				status: 1
			})
		}).catch(err => {
			res.status(500).json({
				message: '',
				error: err
			})
		});
	}, 

	getListPostsbyTagId: (req, res) => {
		let id = req.params.id;
		let listFilter = [];
		postsModel.find().then(posts => {
			posts.forEach((element,index) => {
				element.idTags.forEach((e,i) => {
					if(e.idTag == id) {
						listFilter.push(element); return;
					} 
				})
			});
			res.status(200).json({
				count: listFilter.length,
				message: "list posts after filter by TagID",
				success: listFilter.map(result => {
					return {
						result,
						request: { type: 'GET', url: en_point.link.Posts + result._id }
					}
				})
			})
		}).catch(err=>{
			res.status(500).json({
				message: '',
				error: err
			});
		});
	}
}