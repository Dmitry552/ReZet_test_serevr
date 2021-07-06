const errorService = require('../services/errorService');
const OrderingService = require('../services/OrderingService');
const MaillService = require('../services/maillService');

class OrderingController {

  async feeding(req, res, next) {
    try {
      const {user} = req;
      const dataBasket = await  OrderingService.basketData(user.id);
      const dataMail = await MaillService.sendMail(req.body, dataBasket);
      return res.json(dataMail)
    } catch (error) {
      next(error)
    }
  }
}



module.exports = new OrderingController();