import express from 'express';

import book from './book.js';
import client from './client.js';

const router = new express.Router();

router.use('/product', book);
router.use('/user', client);

export default router;
