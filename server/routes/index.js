const express = require('express');
const usersRouter = require('./users');
const booksRouter = require('./books');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;
