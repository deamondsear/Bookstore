import { Book as BookMapping } from '../models/mapping.js';

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
      const name = req.body.name ?? product.name;
      const price = req.body.price ?? product.price;
      await product.update({ name, price });
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const product = await BookMapping.findByPk(req.params.id);
      if (!product) {
        throw new Error('No such book');
      }
      await product.destroy();
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
}

export default new Book();
