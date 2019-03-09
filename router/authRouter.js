let expree = require('express');
let router = expree.Router();
let authController = require('../controllers/authController');

router.post('/login', authController.login);
// router.get('/:id', authController.getCategoryById);
// router.post('/createCategory', authController.create);
// router.patch('/:id',authController.update);
// router.delete('/:id', authController.deleteCategoryById);
// router.get('/getListPostsByCateId/:id', authController.getListPostsByCateId);

module.exports = router;