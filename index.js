import express from 'express';
import bodyParser from 'body-parser';
import db from './database/db.js';
import { PORT } from './config.js';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router);

const startServer = () => {
  //db is sequelize instance
  db().sync();
  app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`);
  });
};

startServer();
