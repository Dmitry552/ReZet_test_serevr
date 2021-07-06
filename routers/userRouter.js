const Router = require('express');
const router = new Router();
const {body} = require('express-validator');

const authMiddelware = require('../middelware/authMiddelware');

const userController = require('../controller/userController');

router.post('/registration', body('email').isEmail(), body('password').isLength({min: 3, max: 10}), userController.registration);
router.post('/login', body('email').isEmail(), body('password').isLength({min: 3, max: 10}), userController.login);
router.get('/auth', authMiddelware, userController.auth);

module.exports = router;