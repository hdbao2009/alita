var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/imgs');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

module.exports = upload = multer({ storage: storage });