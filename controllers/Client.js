// import an instance of Client Model
import { Client as ClientMapping, sequelize } from '../models/mapping.js';
//for custom queries
import { QueryTypes } from 'sequelize';

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

  async getMostValuable(req, res, next) {
    try {
      const mostValuableCliens = await sequelize.query(
        `SELECT name FROM public."Clients" 
        INNER JOIN public."Orders" ON public."Clients".id=public."Orders"."ClientId"
        GROUP BY name
        ORDER BY SUM(public."Orders"."total_price")
        DESC
        LIMIT 5;`,
        {
          type: QueryTypes.SELECT,
          /*or "model:Client" based on how we able to responce*/
        }
      );
      if (!mostValuableCliens) {
        throw new Error('Server error');
      }
      res.json(mostValuableCliens);
    } catch (error) {
      next(error);
    }
  }
}

export default new Client();
