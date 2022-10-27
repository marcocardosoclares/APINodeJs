const { Router } = require('express');
const BookController = require('../controllers/BookController.js')
const auth = require('../middleware/auth');

const router = Router()

router
    .use(auth)
    .get('/books', BookController.index)
    .get('/books/:id', BookController.show)
    .post('/books', BookController.store)
    .put('/books/:id', BookController.update)
    .delete('/books/:id', BookController.delete)

module.exports = router;
