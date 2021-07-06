const nodemailer = require('nodemailer');
const config = require('../config');

const errorService = require('./errorService');

class MaillService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD
      }
    })
  }

  async sendMail(body, dataBasket) {
    try {
      await this.transporter.sendMail({
        from: config.SMTP_USER,
        to: body.email,
        subject: 'Заказ оформлен',
        text: '',
        html:
          `
            <div>
              <p>Уважаемый ${body.firstname}, спасибо за заказ!</p>
              <p>Товар будет прислав Вам по адресу: ${body.address}</p>

              <h1>Ваш заказ: </h1> <br/>
              ${dataBasket}
            </div>
          `
      }, (err, data) => {
        if(err)  throw errorService.BadRequest('Во время отправки почты что-то пошло не так!');
      })
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MaillService();