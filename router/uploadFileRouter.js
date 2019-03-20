let expree = require('express');
let router = expree.Router();
const uploadFileController = require('../controllers/upLoadFileController');
const upload = require('../repo/uploadFileToLocal');

router.post('/imgs',upload.array('file',3), uploadFileController.upload);
router.post('/upload_image', uploadFileController.uploadImg)
// router.post('/upload_image', postsController.drive);

module.exports = router;