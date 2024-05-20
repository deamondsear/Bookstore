import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = () => {
  app.listen(port, () => {
    console.log(`Your app is listening on port ${port}`);
  });
};

startServer();
