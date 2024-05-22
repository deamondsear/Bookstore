import express from 'express';

const router = new express.Router();

router.post('/signup');
router.post('/login');
router.get('/check');

router.get('/getall');
router.get('/getone/:id([0-9]+)');
router.put('/update/:id([0-9]+)');

export default router;
