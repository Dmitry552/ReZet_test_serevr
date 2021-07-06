const errorService = require('../services/errorService');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
  if(req.method === 'OPTION') return next()
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return next(errorService.UnauthorizedError());
    const decoded = jwt.verify(token, config.SEKRET_KEY);
    req.user = decoded
    next()
  } catch (error) {
    next(errorService.UnauthorizedError());
  }
  
}