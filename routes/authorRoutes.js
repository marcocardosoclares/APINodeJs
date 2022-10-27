const { Router } = require('express');
const AuthorController = require('../controllers/AuthorController')
const auth = require('../middleware/auth');

const router = Router()

router
    .use(auth)
    .get('/authors', AuthorController.index)
    .get('/authors/:id', AuthorController.show)
    .get('/authors/:id/books', AuthorController.books)
    .post('/authors', AuthorController.store)
    .put('/authors/:id', AuthorController.update)
    .delete('/authors/:id', AuthorController.delete)

module.exports = router;
