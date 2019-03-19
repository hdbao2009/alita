const uploadFileToDrive = require('../repo/uploadFileToDrive');

module.exports = {
	upload: async function (req, res) {
    let idDriveIMG = await uploadFileToDrive(req.files[0]);
		return res.json({
			id : idDriveIMG.data.id
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