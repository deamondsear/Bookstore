const dotenv = require('dotenv');

dotenv.config();

module.exports.PORT = process.env.PORT || 3000;
module.exports.DB = process.env.POSTGRES_DB;
module.exports.DB_USER = process.env.POSTGRES_USER;
module.exports.DB_PASSWORD = process.env.POSTGRES_PASSWORD;
