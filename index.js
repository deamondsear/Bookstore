import express from 'express';
import bodyParser from 'body-parser';
import db from './database/db.js';
import { PORT } from './config.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome page');
});

const startServer = () => {
  db().sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  });
};

startServer();
