const uploadFileToDrive = require('../repo/uploadFileToDrive');
const FroalaEditor 	= require('wysiwyg-editor-node-sdk/lib/froalaEditor');

module.exports = {
	uploadImgTitle: async function (req, res) {
    let idDriveIMG = await uploadFileToDrive(req.files[0]);
		return res.json({
			id : idDriveIMG.data.id
		});
	},

	uploadImgContent: async function (req, res) {
	 	let data = await FroalaEditor.Image.upload(req, '/public/imagePosts/');
		const fileName = data.link.split('/')[3];
		let customData = {
			originalname: "postContent_" + fileName,
			path: data.link.substring(1, data.link.length)
		}
		let idDriveIMGPost = await uploadFileToDrive(customData);
		if (err) {
			return res.send(JSON.stringify(err));
		}
		data['link'] = 'https://drive.google.com/uc?id=' + idDriveIMGPost.data.id
		res.send(data);
	}
}