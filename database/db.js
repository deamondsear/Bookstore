import { sequelize } from '../models/mapping.js';

export default function authSequelize() {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
  return sequelize;
}
