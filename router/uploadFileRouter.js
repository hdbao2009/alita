let expree = require('express');
let router = expree.Router();
const uploadFileController = require('../controllers/upLoadFileController');
const upload = require('../repo/uploadFileToLocal');

router.post('/imgs',upload.array('file',3), uploadFileController.uploadImgTitle);
router.post('/upload_image', uploadFileController.uploadImgContent)

module.exports = router;