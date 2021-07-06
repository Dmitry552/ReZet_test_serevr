require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  URL_DB: process.env.URL_DB || 'mongodb+srv://dbUser:a9dnWGRZtNWrOfmX@rezet.vn0kp.mongodb.net/ReZet?retryWrites=true&w=majority',
  SEKRET_KEY: process.env.SEKRET_KEY || '3487BVbyyerR3VTN8rvy3287rgcnugui3',
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'nodemaill552@gmail.com',
  SMTP_PASSWORD: 'Dima12345Dima',
  API_URL: 'http://localhost:5000',
  CLIENT_URL: 'http://localhost:3000'
}