import express from 'express';

import book from './book.js';
import client from './client.js';

const router = new express.Router();

router.use('/books', book);
router.use('/clients', client);

export default router;
