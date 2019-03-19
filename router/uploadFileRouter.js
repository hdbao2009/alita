let expree = require('express');
let router = expree.Router();
const uploadFileController = require('../controllers/upLoadFileController');
const upload = require('../repo/uploadFileToLocal');

router.post('/imgs', uploadFileController.upload);
// router.post('/upload_image', postsController.uploadImg)
// router.post('/upload_image', postsController.drive);

module.exports = router;