const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const PORT = require('./config').PORT;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome page');
});

const startServer = () => {
  db().sync();
  app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  });
};

startServer();
