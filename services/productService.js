const Product = require('../models/Product');
const fs = require('fs');
const path = require('path')

const config = require('../config');
const errorService = require('./errorService');

class ProductService {
  async clear(title, price, description, image, filePath) {
    
    const product = await new Product({
      title,
      price,
      description,
      image
    });
    await product.save();
    const productPath = `${filePath}\\${product._id}`;
    fs.mkdirSync(productPath);
    return product;
  }

  async get(e) {
    const product = await Product.find();
    return product;
  }

  async delete(id, filePath) {
    const product = await Product.findById(id);
    if(!product) throw errorService.BadRequest('Данного товара не существует!');
    if(fs.existsSync(`${filePath}\\${product._id}`)) fs.rmdirSync(`${filePath}\\${product._id}`, {recursive: true});
    product.remove();
    return product;
  }
}

module.exports = new ProductService();