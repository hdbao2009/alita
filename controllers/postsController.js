let postsModel 			= require("../models/postsModel");
let tagsModel 			= require("../models/tagsModel");
let en_point 				= require("../constant");
let moment 					= require('moment');
let _ 							= require('lodash');
let path					 	= require('path')
const uploadFileToDrive = require('../repo/uploadFileToDrive');
const lazyLoadPosts = require('../repo/lazyLoadPosts');
const checkTags = require('../repo/checkTags');

module.exports = {
	// Show list posts
	list: (req, res) => {
		let pages = req.query.pages;
		pages = pages ? pages.substring(0, pages.length - 1) : 0;
		return lazyLoadPosts.LoadAll(req, res, +pages);
	},

	// Create posts
	create: async (req, res) => {
		try {
			req.body.listIdTags = await checkTags(req.body.listIdTags);
			let posts = new postsModel(req.body);
			posts.createDate = moment(new Date()).format('DD/MM/YYYY, h:mm:ss');
			posts.save().then(result => {
				res.status(201).json({
					message: "created posts successfully",
					success: result,
					status: 1
				});
			}).catch(err => {
				res.status(500).json({
					message: 'Error when creating posts',
					error: err
				});
			});
		} catch (error) {
			res.status(500).json({
				message: 'Error when creating posts',
				error: error
			});
		}
		
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
		postsModel.deleteOne({
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