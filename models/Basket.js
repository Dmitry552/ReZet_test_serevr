const {Schema, model, ObjectId} = require('mongoose');

const Basket = new Schema({
  owner: {type: ObjectId, ref: 'User'},
  product: [{type: ObjectId, ref: 'BasketProduct'}],
  fullPrice: {type: Number, default: 0}
})

module.exports = model('Basket', Basket);