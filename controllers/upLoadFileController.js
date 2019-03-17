const uploadFileToDrive = require('../repo/uploadFileToDrive');

module.exports = {
	upload: function (req, res) {
    uploadFileToDrive(req.files[0]);
		return res.json({
			msg: "dung roi"
		});
	},

	uploadImg: function (req, res) {
		// Store image.
		FroalaEditor.Image.upload(req, '/public/uploads/', function (err, data) {
			// Return data.
			if (err) {
				return res.send(JSON.stringify(err));
			}
			let link = process.env.LINK_UPLOAD || 'http://localhost:8000'
			data['link'] = `${link}${data['link'].replace("/public",'')}`
			res.send(data);
		});
	}
}