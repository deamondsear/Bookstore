// import an instance of Client Model
import {
  Client as ClientMapping,
  Order as OrderMapping,
  sequelize,
} from '../models/mapping.js';
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
      next();
      res.json(error);
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.id) {
        res.json({ error: 'Please provide an id' });
      }
      const client = await ClientMapping.findByPk(req.params.id);
      if (!client) {
        res.json({ error: 'No such client' });
      }
      res.json(client);
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
      const client = await ClientMapping.findByPk(req.params.id);
      if (!client) {
        res.json({ error: 'No such client' });
      }
      const login = req.body.login ?? client.login;
      await client.update({ login });
      res.json(client);
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async getMostValuable(req, res, next) {
    try {
      const mostValuableCliens = await sequelize.query(
        `SELECT login FROM clients
        INNER JOIN orders ON clients.id=orders.client_id
        INNER JOIN order_items ON orders.id=order_items.order_id
        GROUP BY login
        ORDER BY SUM(quantity*sale_price)
        DESC
        LIMIT 5;`,
        {
          type: QueryTypes.SELECT,
          /*or "model:Client" based on how we able to responce*/
        }
      );

      // const mostValuableCliens = await ClientMapping.findAll({
      //   attributes: ['login'],
      //   include: [
      //     {
      //       model: OrderMapping,
      //       attributes: []
      //     }
      //   ],
      //   group: ['login'],
      //   order: [
      //     [

      //     ]
      //   ]
      // })

      if (!mostValuableCliens) {
        res.json({ error: 'Server error' });
      }
      res.json(mostValuableCliens);
    } catch (error) {
      next();
      res.json(error);
    }
  }
}

export default new Client();
