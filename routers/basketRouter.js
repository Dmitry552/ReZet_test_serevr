const Router = require('express');
const router = new Router();

const authMiddelware = require('../middelware/authMiddelware');

const basketController = require('../controller/basketController');

router.post('/', authMiddelware, basketController.addProduct);
router.post('/update', authMiddelware, basketController.updateProduct);
router.delete('/', authMiddelware, basketController.deleteProduct);
router.get('/', authMiddelware, basketController.getProduct);
router.delete('/clear', authMiddelware, basketController.clearProduct);

module.exports = router;