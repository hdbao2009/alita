let expree = require('express');
let router = expree.Router();
let categoryController = require('../controllers/categoriesController');

router.get('/', categoryController.list);
router.get('/:id', categoryController.getCategoryById);
router.post('/createCategory', categoryController.create);
router.delete('/:id', categoryController.deleteCategoryById);
router.get('/getListPostsByCateId/:id', categoryController.getListPostsByCateId);

module.exports = router;