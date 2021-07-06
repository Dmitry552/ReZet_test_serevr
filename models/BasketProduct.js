const {Schema, model, ObjectId} = require('mongoose');

const BasketProduct = new Schema({
  basket: {type: ObjectId, ref: 'Basket'},
  product: {type: ObjectId, ref: 'Product'},
  quantity: {type: Number, default: 1},
  price: {type: Number, default: 0},
});

module.exports = model("BasketProduct", BasketProduct);