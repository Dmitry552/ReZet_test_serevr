const Product = require('../models/Product');
const User = require('../models/User');
const Basket = require('../models/Basket');
const BasketProduct = require('../models/BasketProduct');

const config = require('../config');
const errorService = require('./errorService');

class BasketService {

  async basket(id) {
    const product = await BasketProduct.find({basket: id}).populate('product');
    return product;
  }

  async update(productId, quantity, id) {
    if(quantity < 1) quantity = 1;
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const basketProduct = await BasketProduct.findOne({basket: basket._id, _id: productId});
    if(!basketProduct) throw errorService.BadRequest('Товар в корзине не найден!');
    const productPrice = basketProduct.price / basketProduct.quantity;
    basket.fullPrice = basket.fullPrice - basketProduct.price;
    basketProduct.quantity = quantity;
    basketProduct.price = quantity * productPrice;
    basket.fullPrice = basket.fullPrice + basketProduct.price;
    await basketProduct.save();
    const currentProduct = await this.basket(basket._id);
    return {currentProduct, fullPrice: basket.fullPrice};
  }

  async add(productId, id) {
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const product = await Product.findById(productId);
    if(!product) throw errorService.BadRequest('Такого товара не существует!');
    const basketProduct = await new BasketProduct({basket: basket._id, product: product._id, price: product.price});
    basket.fullPrice = basket.fullPrice + basketProduct.price;
    basket.product.push(basketProduct._id);
    await basketProduct.save();
    await basket.save();
    
    const currentProduct = await this.basket(basket._id);
    return {currentProduct, fullPrice: basket.fullPrice};
  }

  async get(id) {
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const currentProduct = await this.basket(basket._id)
    return {currentProduct, fullPrice: basket.fullPrice};
  }

  async delete(productId, id) {
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const basketProduct = await BasketProduct.findOne({product: productId});
    if(!basketProduct) throw errorService.BadRequest('Такого товара в корзине не существует!');
    basket.fullPrice = basket.fullPrice - basketProduct.price;
    basket.product = basket.product.filter(p => p != productId)
    await basketProduct.remove();
    await basket.save();
    const currentProduct = await this.basket(basket._id);
    return {currentProduct, fullPrice: basket.fullPrice};
  }

  async clear(id) {
    const basket = await Basket.findOne({owner: id});
    if(!basket) throw errorService.BadRequest('Корзина пользователя не найдена!');
    const basketProduct = await BasketProduct.remove({basket: basket._id});
    if(!basketProduct) throw errorService.BadRequest('Такого товара в корзине не существует!');
    basket.fullPrice = 0;
    basket.product = basket.product.filter(p => p === 'doom');
    await basket.save();
    const currentProduct = await this.basket(basket._id);
    return {currentProduct, fullPrice: basket.fullPrice};
  }
}

module.exports = new BasketService();