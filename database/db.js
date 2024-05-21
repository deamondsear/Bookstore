const { Sequelize } = require('sequelize');
const { DB, DB_PASSWORD, DB_USER } = require('../config.js');

module.exports = function db() {
  const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    dialect: 'postgres',
    host: '127.0.0.1',
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
};
