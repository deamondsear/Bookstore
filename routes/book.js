import express from 'express';
import BookController from '../controllers/Book.js';
const router = new express.Router();

router.get('/getall', BookController.getAll);
router.get('/getone/:id([0-9]+)', BookController.getOne);
router.post('/create', BookController.create);
router.patch('/update/:id([0-9]+)', BookController.update);
router.delete('/delete/:id([0-9]+)', BookController.delete);

export default router;
