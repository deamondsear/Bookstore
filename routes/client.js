import express from 'express';
// import an instance of Client CLASS
import ClientController from '../controllers/Client.js';

const router = new express.Router();

router.post('/signup', ClientController.signup);
router.post('/login', ClientController.login);
router.get('/check', ClientController.check);

router.get('/getall', ClientController.getAll);
router.get('/getone/:id([0-9]+)', ClientController.getOne);
router.put('/update/:id([0-9]+)', ClientController.update);

export default router;
