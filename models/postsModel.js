let mongoose = require('mongoose');
let schema = mongoose.Schema;

let postsModel = new schema({
	title: { type: String, enique: true},
	description: {type: String, default: null},
	content: {type: String , default: null},
	createDate: {type: String, default: null},
	updateDate: {type: String, default: null},
	imageName: {type: String, default: null},
	listIdTags: [],
	idCategory: {type: String},
	idAuthor: {type: String}
});

module.exports = mongoose.model('posts', postsModel);