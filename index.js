
const express = require('express');
const config = require('./config');
const cors = require('cors');
const router = require('./routers');
const path = require('path');
const mongoose = require('mongoose');
const errorMiddelware = require('./middelware/errorMiddelware');
const filePathMiddeleare = require('./middelware/filePathMiddelware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(filePathMiddeleare(path.resolve(__dirname, './files')));

app.use('/api', router);

app.use('*', (req, res) => {
  return res.send('Неизвесный URL адресс!')
})

app.use(errorMiddelware)

const start = async () => {
  try {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => console.log('Запущена база данных!'));
    await mongoose.connect(config.URL_DB, {useNewUrlParser: true, useUnifiedTopology: true});
    app.listen(config.PORT, () => console.log(`Сервер запущен на порте: ${config.PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()