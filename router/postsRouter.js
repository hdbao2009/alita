let expree = require('express');
let router = expree.Router();
let postsController = require('../controllers/postsController');
let upload = require('../controllers/upLoadFile');

router.get('/', postsController.list);
router.post('/createPost', postsController.create);
router.get('/:id', postsController.getPostsById);
router.patch('/:id', postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);
router.post('/api/upload',upload.array('file',3), postsController.upload);

module.exports = router;