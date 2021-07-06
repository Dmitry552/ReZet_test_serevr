require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  URL_DB: process.env.URL_DB,
  SEKRET_KEY: process.env.SEKRET_KEY,
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: 587,
  SMTP_USER: 'nodemaill552@gmail.com',
  SMTP_PASSWORD: 'Dima12345Dima',
  API_URL: 'http://localhost:5000',
  CLIENT_URL: 'http://localhost:3000'
}