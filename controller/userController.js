const errorService = require('../services/errorService');
const userService = require('../services/userService');
const {validationResult} = require('express-validator')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(errorService.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await userService.registration(email, password);
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(errorService.BadRequest('Ошибка при валидации', errors.array()))
      }
      const {email, password} = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async auth(req, res, next) {
    try {
      const {id} = req.user;
      const userData = await userService.auth(id);
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController();