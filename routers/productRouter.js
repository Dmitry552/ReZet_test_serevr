const Router = require('express');
const router = new Router();

const authMiddelware = require('../middelware/authMiddelware');

const productController = require('../controller/productController');

/**
 * Cоздание продукта (productController.create) на клиенте не реализован. Использовать либо Advanced REST Client либо Postman. 
 * Адрес картинки закладывать в виде строки.
 */
router.post('/', productController.create); 
router.get('/', productController.get);
router.delete('/',  productController.delete); //id товара для удаления отправлять query параметром

module.exports = router;