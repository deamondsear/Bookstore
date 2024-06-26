import express from 'express';
// import an instance of Client CLASS
import ClientController from '../controllers/Client.js';

const router = new express.Router();

//Don`t forget to use main router /clients
router.post('/signup', ClientController.signup);
router.post('/login', ClientController.login);
router.get('/check', ClientController.check);

router.get('/getall', ClientController.getAll);
router.get('/getone/:id([0-9]+)', ClientController.getOne);
router.get('/getMostValuable', ClientController.getMostValuable);
router.patch('/update/:id([0-9]+)', ClientController.update);

export default router;
