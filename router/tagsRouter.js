let expree = require('express');
let router = expree.Router();
let tagsController = require('../controllers/tagsController');

router.get('/', tagsController.list);
router.get('/:id', tagsController.getTagById);
router.post('/createTag', tagsController.create);
router.delete('/:id', tagsController.deleteTagById);
router.get('/getListPostsbyIdTag/:name', tagsController.getListPostsbyTagId);

module.exports = router;