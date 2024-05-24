// import an instance of Book Model
import { Book as BookMapping, sequelize } from '../models/mapping.js';
//for custom queries
import { QueryTypes } from 'sequelize';

class Book {
  async getAll(req, res, next) {
    try {
      const books = await BookMapping.findAll();
      res.json(books);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        throw new Error('No such book');
      }
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { name, author, quantity, price } = req.body;
      const book = await BookMapping.create({ name, author, quantity, price });
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        throw new Error('No such book');
      }

      //nullish coalescence
      const name = req.body.name ?? book.name;
      const price = req.body.price ?? book.price;
      const author = req.body.author ?? book.author;
      const quantity = req.body.quantity ?? book.quantity;
      await book.update({ name, price, author, quantity });
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const book = await BookMapping.findByPk(req.params.id);
      if (!book) {
        throw new Error('No such book');
      }
      await book.destroy();
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

  async getBestsellers(req, res, next) {
    try {
      const bestsellers = await sequelize.query(
        `SELECT "title", "author" FROM public."Books"
      INNER JOIN public."OrderItems" ON public."Books".id = public."OrderItems"."BookId" 
      GROUP BY title, author 
      ORDER BY SUM("price" * public."OrderItems".quantity) 
      DESC 
      LIMIT 5;`,
        {
          type: QueryTypes.SELECT,
          /*or "model:Book" based on how we able to responce*/
        }
      );
      if (!bestsellers) {
        throw new Error('Server error');
      }
      res.json(bestsellers);
    } catch (error) {
      next(error);
    }
  }

  async getAverageBill(req, res, next) {
    try {
      const avgBill = await sequelize.query(
        `SELECT ROUND(AVG(total_price), 2) FROM public."Orders";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      if (!avgBill) {
        throw new Error('Server error');
      }
      res.json(avgBill);
    } catch (error) {
      next(error);
    }
  }
}

export default new Book();
