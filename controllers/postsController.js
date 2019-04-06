let postsModel 			= require("../models/postsModel");
let moment 					= require('moment');
const lazyLoad = require('../repo/lazyLoad');
const checkTags 		= require('../repo/checkTags');

module.exports = {
	// Show list posts
	list: (req, res) => {
		let pages = req.query.pages;
		pages = pages ? pages.substring(0, pages.length - 1) : 1;
		return lazyLoad.LoadAll(req, res, +pages);
	},

	// Create posts
	create: async (req, res) => {
		try {
			req.body.listIdTags = await checkTags(req.body.listIdTags);
			let posts = new postsModel(req.body);
			posts.createDate = moment(new Date()).format('DD/MM/YYYY, h:mm:ss');
			let result = await posts.save();
			res.status(201).json({
				message: "created posts successfully",
				success: result,
				status: 1
			});
		} catch (error) {
			res.status(500).json({
				message: 'Error when creating posts',
				error: error
			});
		}
	},

	// Get posts by id
	getPostsById: async (req, res) => {
		let id = req.params.id;
		//TODO: Plan one
		// postsModel.findOne({ _id: id }, (err, post) => {
		// 	return res.json(post);
		// });

		//TODO: Plan two
		try {
			let result = await postsModel.findById(id).select().exec();
			res.status(200).json({
				message: 'get posts successfully',
				success: result
			})
		} catch (error) {
			res.status(500).json({
				message: '',
				error: error
			})
		}
	},


	// Update posts by Id
	updatePostById: async (req, res) => {
		try {
			let id = req.params.id;
			let result = await postsModel.update({_id: id}, {$set: req.body}).exec();
			res.status(200).json({
				message: "updated posts successfully",
				success: result,
				status: 1
			})
		} catch (error) {
			res.status(500).json({
				message: '',
				error: error
			})
		}
	},

	// Delete post by Id
	deletePostById: async (req, res) => {
		try {
			let id = req.params.id;
			let result = await postsModel.deleteOne({_id: id}).exec();
			res.status(200).json({
				message: 'Deleted Post Successfully',
				success: result,
				status: 1
			})
		} catch (error) {
			res.status(500).json({
				message: '',
				error: error
			})
		}
	}
}