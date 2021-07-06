const errorService = require('../services/errorService');
const productService = require('../services/productService');

class ProductController {
  async create(req, res, next) {
    try {
      const {title, price, description, image} = req.body;
      const productData = await productService.clear(title, Number(price), description, image, req.filePath);
      return res.json(productData)
    } catch (error) {
      next(error)
    }
  }

  async get(req, res, next) {
    try {
      const productData = await productService.get(req.filePath);
      return res.json(productData)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const {filePath} = req;
      const {id} = req.query;
      const productData = await productService.delete(id, filePath);
      return res.json(productData)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProductController();