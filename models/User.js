const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  basket: {type: ObjectId, ref: 'Basket'}
})

module.exports = model('User', User);