const uploadFileToDrive = require('../repo/uploadFileToDrive');
const FroalaEditor 	= require('wysiwyg-editor-node-sdk/lib/froalaEditor');

module.exports = {
	upload: async function (req, res) {
    let idDriveIMG = await uploadFileToDrive(req.files[0]);
		return res.json({
			id : idDriveIMG.data.id
		});
	},

	uploadImg: function (req, res) {
		FroalaEditor.Image.upload(req, '/public/imagePosts/', async function (err, data) {
			const fileName = data.link.split('/')[3];
			let customData = {
				originalname: fileName,
				path: data.link.substring(1, data.link.length)
			}
			let idDriveIMGPost = await uploadFileToDrive(customData);
			
			if (err) {
				return res.send(JSON.stringify(err));
			}

			let link = process.env.LINK_UPLOAD || 'http://localhost:8000'
			// data['link'] = `${link}${data['link'].replace("/public",'')}`
			data['link'] = 'https://drive.google.com/uc?id=' + idDriveIMGPost.data.id
			
			res.send(data);
		});
	}
}