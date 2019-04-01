let expree = require('express');
let router = expree.Router();
let authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/', authController.list);
// router.post('/createCategory', authController.create);
// router.patch('/:id',authController.update);
router.delete('/:id', authController.delete);
// router.get('/getListPostsByCateId/:id', authController.getListPostsByCateId);

module.exports = router;