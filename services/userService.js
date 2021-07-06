const User = require('../models/User');
const Basket = require('../models/Basket');
const config = require('../config');
const errorService = require('./errorService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
  generateToken(payload) {
    return jwt.sign(payload, config.SEKRET_KEY, {expiresIn: '24h'})
  }

  async registration(email, password) {
    const candidate = await User.findOne({email});
    if(candidate) throw errorService.BadRequest(`Пользователь ${email} существует!`);
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await new User({
      email,
      password: hashPassword
    })
    const basket = await new Basket({
      owner: user._id
    })
    user.basket = basket._id;
    user.save();
    basket.save();
    const token = this.generateToken({id: user._id, email: user.email});
    return {
      token,
      user
    };
  }

  async login(email, password) {
    const user = await User.findOne({email})
    if(!user) throw errorService.BadRequest('Вы незарегестированы!');
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword) throw errorService.BadRequest('Неверный пароль!');
    const token = this.generateToken({id: user._id, email: user.email})
    return {
      token,
      user
    };
  }

  async auth(id) {
    const user = await User.findOne({_id: id});
    const token = this.generateToken({id: user._id, email: user.email})
    return {
      token,
      user
    }
  }
}

module.exports = new UserService();