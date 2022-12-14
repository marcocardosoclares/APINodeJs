const { Router } = require('express');
const PublisherController = require('../controllers/PublisherController')
const auth = require('../middleware/auth');

const router = Router()

router
    .use(auth)
    .get('/publishers', PublisherController.index)
    .get('/publishers/:id', PublisherController.show)
    .get('/publishers/:id/books', PublisherController.books)
    .post('/publishers', PublisherController.store)
    .put('/publishers/:id', PublisherController.update)
    .delete('/publishers/:id', PublisherController.delete)

module.exports = router;
