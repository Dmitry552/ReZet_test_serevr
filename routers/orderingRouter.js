const Router = require('express');
const router = new Router();

const authMiddelware = require('../middelware/authMiddelware');

const orderingController = require('../controller/orderingController');

router.post('/', authMiddelware, orderingController.feeding);

module.exports = router;