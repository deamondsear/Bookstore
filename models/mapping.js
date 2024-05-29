import { Sequelize, DataTypes } from 'sequelize';
import { DB, DB_PASSWORD, DB_USER, HOST } from '../config.js';

// DB instance
const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: HOST,
  define: {
    timestamps: false,
    underscored: true,
  },
});

// Model Client
const Client = sequelize.define('client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

// Model Book
const Book = sequelize.define('book', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 100000 },
  actual_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// // Model Basket
// const Basket = sequelize.define('Basket', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// // Basket and Book junction table
// const BasketBook = sequelize.define('BasketBook', {
//   quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
// });

// Model Order
const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//Model Items in Order
const OrderItem = sequelize.define('order_item', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  sale_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

// Table`s relations

// many-to-many for book can be in many baskets and backet can contain many books
// Basket.belongsToMany(Book, { through: BasketBook, onDelete: 'CASCADE' });
// Book.belongsToMany(Basket, { through: BasketBook, onDelete: 'CASCADE' });

// one-to-one for Client can have one Basket and Basket can belong to one Client
// Client.belongsTo(Basket);
// Basket.belongsTo(Client);

// many-to-many for Order can contain many Items and Items can belong to many Orders
Order.belongsToMany(Book, { through: OrderItem, onDelete: 'CASCADE' });
Book.belongsToMany(Order, { through: OrderItem, onDelete: 'CASCADE' });

// one-to-many for Client can have many Orders and Order can belong one Client
Client.hasMany(Order, { as: 'orders', onDelete: 'SET NULL' });
Order.belongsTo(Client);

export { sequelize };
export { Client, Book, Order, OrderItem };
