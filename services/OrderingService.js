
const Basket = require('../models/Basket');
const BasketProduct = require('../models/BasketProduct');
const errorService = require('./errorService');

class OrderingService {

  async basketData(id) {
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const product = await BasketProduct.find({basket: basket._id}).populate('product');
    if(!product) throw errorService.BadRequest('Товары в корзине не найдены!');
    return product;
  }
}

module.exports = new OrderingService();