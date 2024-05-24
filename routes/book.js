import express from 'express';
// import an instance of Book CLASS
import BookController from '../controllers/Book.js';
const router = new express.Router();

router.get('/getall', BookController.getAll);
router.get('/getone/:id([0-9]+)', BookController.getOne);
router.get('/getBestsellers', BookController.getBestsellers);
router.get('/getAverageBill', BookController.getAverageBill);
router.post('/create', BookController.create);
router.patch('/update/:id([0-9]+)', BookController.update);
router.delete('/delete/:id([0-9]+)', BookController.delete);

export default router;
