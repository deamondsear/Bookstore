// import an instance of Book Model
import {
  Book as BookMapping,
  OrderItem as OrderItemMapping,
  sequelize,
} from '../models/mapping.js';
//for custom queries
import { QueryTypes } from 'sequelize';

class Book {
  async getAll(req, res, next) {
    try {
      const books = await BookMapping.findAll();
      res.json(books);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        res.json({ error: 'Please provide an id' });
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        res.json({ error: 'No such book' });
      }
      res.json(book);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async create(req, res, next) {
    try {
      // const { title, author, stock, actual_price } = req.body;
      const book = await BookMapping.create(req.body);
      res.json(book);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        res.json({ error: 'Please provide an id' });
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        res.json({ error: 'No such book' });
      }

      //nullish coalescence
      const title = req.body.title ?? book.title;
      const actual_price = req.body.actual_price ?? book.actual_price;
      const author = req.body.author ?? book.author;
      const stock = req.body.stock ?? book.stock;
      await book.update({ title, actual_price, author, stock });
      res.json(book);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        res.json({ error: 'Please provide an id' });
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        res.json({ error: 'No such book' });
      }
      await book.destroy();
      res.json(book);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async getBestsellers(req, res, next) {
    try {
      const bestsellers = await sequelize.query(
        `SELECT title, author FROM books 
        INNER JOIN order_items ON books.id = order_items.book_id 
        GROUP BY title, author 
        ORDER BY SUM(sale_price * quantity) 
        DESC 
        LIMIT 5;`,
        {
          type: QueryTypes.SELECT,
          /*or "model:Book" based on how we able to responce*/
        }
      );

      // const bestsellers = await BookMapping.findAll({
      //   attributes: ['title', 'author'],
      //   include: [
      //     {
      //       model: OrderItemMapping,
      //       attributes: [],
      //     },
      //   ],
      //   group: ['title', 'author'],
      //   order: [
      //     [
      //       sequelize.fn(
      //         'SUM',
      //         sequelize.literal('sale_price * quantity')
      //       ),
      //       'DESC',
      //     ],
      //   ],
      //   limit: 5,
      // });
      if (!bestsellers) {
        res.json({ error: 'Server error' });
      }
      res.json(bestsellers);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async getAverageBill(req, res, next) {
    try {
      const avgBill = await sequelize.query(
        `SELECT ROUND(AVG(sale_price*quantity), 2) AS average_bill FROM order_items;`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (!avgBill) {
        res.json({ error: 'Server error' });
      }
      res.json(avgBill);
    } catch (error) {
      next();
      res.json(error);
    }
  }
}

export default new Book();
