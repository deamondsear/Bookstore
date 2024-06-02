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
      const client = await ClientMapping.findByPk(req.params.id);
      if (!client) {
        res.status(400).send({ error: 'No such client' });
      } else {
        res.json(client);
      }
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async update(req, res, next) {
    try {
      const client = await ClientMapping.findByPk(req.params.id);
      if (!client) {
        res.status(400).send({ error: 'No such client' });
      } else {
        const username = req.body.username ?? client.username;
        await client.update({ username });
        res.json(client);
      }
    } catch (error) {
      next();
      res.json(error);
    }
  }

  async getMostValuable(req, res, next) {
    try {
      const mostValuableCliens = await sequelize.query(
        `SELECT username FROM clients
        INNER JOIN orders ON clients.id=orders.client_id
        INNER JOIN order_items ON orders.id=order_items.order_id
        GROUP BY username
        ORDER BY SUM(quantity*sale_price)
        DESC
        LIMIT 5;`,
        {
          type: QueryTypes.SELECT,
          /*or "model:Client" based on how we able to responce*/
        }
      );

      // const mostValuableCliens = await ClientMapping.findAll({
      //   attributes: ['username'],
      //   include: [
      //     {
      //       model: OrderMapping,
      //       attributes: []
      //     }
      //   ],
      //   group: ['username'],
      //   order: [
      //     [

      //     ]
      //   ]
      // })

      if (!mostValuableCliens) {
        res.status(500).send({ error: 'Server error' });
      } else {
        res.json(mostValuableCliens);
      }
    } catch (error) {
      next();
      res.json(error);
    }
  }
}

export default new Client();
