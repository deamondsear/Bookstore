import express from 'express';

const router = new express.Router();

router.get('/getall');
router.get('/getone/:id([0-9]+)');
router.post('/create');
router.put('/update/:id([0-9]+)');
router.delete('/delete/:id([0-9]+)');

export default router;
