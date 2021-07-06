const errorService = require('../services/errorService');
const BasketService = require('../services/BasketService');

class BasketController {

  async updateProduct(req, res, next) {
    try {
      const {productId, quantity} = req.body;
      const {user} = req;
      const dataBasket = await  BasketService.update(productId, quantity, user.id)
      
      return res.json(dataBasket)
    } catch (error) {
      next(error)
    }
  }
  async deleteProduct(req, res, next) {
    try {
      const {productId} = req.query;
      const {user} = req;
      const dataBasket = await  BasketService.delete(productId, user.id)
      return res.json(dataBasket)
    } catch (error) {
      next(error)
    }
  }

  async addProduct(req, res, next) {
    try {
      const {productId} = req.body;
      const {user} = req;
      const dataBasket = await  BasketService.add(productId, user.id)
      return res.json(dataBasket)
    } catch (error) {
      next(error)
    }
  }

  async getProduct(req, res, next) {
    try {
      const {user} = req;
      const dateBasket = await BasketService.get(user.id);
      return res.json(dateBasket)
    } catch (error) {
      next(error)
    }
  }

  async clearProduct(req, res, next) {
    try {
      const {user} = req;
      const dateBasket = await BasketService.clear(user.id);
      return res.json(dateBasket)
    } catch (error) {
      next(error)
    }
  }
}



module.exports = new BasketController();