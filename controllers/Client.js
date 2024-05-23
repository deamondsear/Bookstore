// import an instance of Client Model
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
      const clients = await ClientMapping.findAll();
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
      if (!client) {
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
      const client = await ClientMapping.findByPk(req.params.id);
      if (!client) {
        throw new Error('No such client');
      }
      const name = req.body.name ?? client.name;
      await client.update({ name });
      res.json(client);
    } catch (error) {
      next(error);
    }
  }
}

export default new Client();
