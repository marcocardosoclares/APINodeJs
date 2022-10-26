const { Router } = require('express');
const BookController = require('../controllers/BookController.js')

const router = Router()

router
    .get('/books', BookController.index)
    .get('/books/:id', BookController.show)
    .post('/books', BookController.store)
    .put('/books/:id', BookController.update)
    .delete('/books/:id', BookController.delete)

module.exports = router;
