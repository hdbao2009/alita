let expree = require('express');
let router = expree.Router();
let postsController = require('../controllers/postsController');

router.get('/', postsController.list);
router.post('/createPost', postsController.create);
router.get('/:id', postsController.getPostsById);
router.patch('/:id', postsController.updatePostById);
router.delete('/:id', postsController.deletePostById);

module.exports = router;