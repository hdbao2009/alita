let postsModel 			= require("../models/postsModel");
let tagsModel 			= require("../models/tagsModel");
let en_point 				= require("../constant");
let moment 					= require('moment');
let _ 							= require('lodash');
let path					 	= require('path')
const uploadFileToDrive = require('../repo/uploadFileToDrive');

module.exports = {
	// Show list posts
	list: (req, res, next) => {
		postsModel.find()
			.select()
			.exec().then(result => {
				const reponse = {
					posts: result,
					count: result.length
				}
				res.status(200).json(reponse);
			}).catch(err => {
				res.status(500).json({
					error: err
				})
			})
	},

	// Create posts
	create: async (req, res) => {
		let posts = new postsModel(req.body);
		const listIdTags = Object.assign([], posts.listIdTags);
		posts.listIdTags = [];
		listIdTags.forEach(element => {
			let tags = new tagsModel({name: element});
			let data = tags.save();
			posts.listIdTags.push(data._id);
		});
		console.log(posts);
		
		// posts.createDate = moment(new Date()).format('DD/MM/YYYY, h:mm:ss');
		// posts.save().then(result => {
		// 	res.status(201).json({
		// 		message: "created posts successfully",
		// 		success: result,
		// 		status: 1
		// 	});
		// }).catch(err => {
		// 	res.status(500).json({
		// 		message: 'Error when creating posts',
		// 		error: err
		// 	});
		// });
	},

	// Get posts by id
	getPostsById: (req, res) => {
		let id = req.params.id;
		//TODO: Plan one
		// postsModel.findOne({ _id: id }, (err, post) => {
		// 	return res.json(post);
		// });

		//TODO: Plan two
		postsModel.findById(id)
			.select()
			.exec()
			.then(result => {
				if (result) {
					res.status(200).json({
						message: 'get posts successfully',
						post: result
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


	// Update posts by Id
	updatePostById: (req, res) => {
		let id = req.params.id;
		postsModel.update({_id: id}, {$set: req.body})
			.exec().then(result => {
				res.status(200).json({
					message: "updated posts successfully",
					success: result,
					status: 1
				})
			}).catch(err => {
				res.status(500).json({
					message: '',
					error: err
				})
			});
	},

	// Delete post by Id
	deletePostById: (req, res) => {
		let id = req.params.id;
		postsModel.remove({
				_id: id
			})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Deleted Post Successfully',
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