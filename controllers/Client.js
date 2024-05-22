import { Client as ClientMapping } from '../models/mapping.js';

class Client {
  async signup(req, res, next) {
    res.status(200).send('Sign up');
  }

  async login(req, res, next) {
    res.status(200).send('Authenticate');
  }

  async check(req, res, next) {
    res.status(200).send('Validate');
  }

  async getAll(req, res, next) {
    try {
      const clients = ClientMapping.findAll();
      res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const client = await ClientMapping.findByPk(req.params.id);
      if (!user) {
        throw new Error('No such client');
      }
      res.json(client);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.id) {
        throw new Error('Please provide an id');
      }
      const user = await ClientMapping.findByPk(req.params.id);
      if (!user) {
        throw new Error('No such client');
      }
      const name = req.body.name ?? user.name;
      const password = req.body.password ?? user.password;
      await user.update({ name, password });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new Client();
