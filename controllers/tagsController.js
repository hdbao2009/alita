let tagsModel = require('../models/tagsModel');
let postsModel = require('../models/postsModel');
let _ = require('lodash');

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
		tagsModel.deleteOne({_id: id})
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

	getListPostsbyTagId: async (req, res) => {
		try {
			let name = req.params.name;
			const listPostsLean = await postsModel.find().lean();
			const listPostsExistsIDTags = listPostsLean.filter(e => _.findIndex(e.listIdTags, {"name": name}) !== -1 ? e : null);
				res.status(200).json({
					count: listPostsExistsIDTags.length,
					message: "list posts after filter by Tags name",
					success: listPostsExistsIDTags
				})
		} catch (error) {
			res.end()
			console.error(error);
		}
	}
}