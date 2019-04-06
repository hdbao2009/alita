let expree = require('express');
let router = expree.Router();
let productController = require('../controllers/productController');
let postsController = require('../controllers/postsController');

router.get('/', productController.list);
router.get('/:id', productController.getProByID);
router.post('/createProduct', productController.create);
router.patch('/update/:id', productController.update);
router.patch('/addRate/:id', productController.addRate);
router.delete('/:id', productController.deleteProductById);
// router.patch('/:id', productController.update);

module.exports = router;