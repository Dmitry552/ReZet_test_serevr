const {Schema, model, ObjectId} = require('mongoose');

const Product = new Schema({
  title: {type: String, required: true},
  price: {type: Number, default: 0},
  description: {type: String, default: ''},
  image: {type: String, default: ''}
});

module.exports = model("Product", Product);