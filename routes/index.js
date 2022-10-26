const bodyParser = require('body-parser');
const authors = require('./authorRoutes');
const books = require('./bookRoutes');
const publishers = require('./publisherRoutes');
const users = require('./userRoutes');

module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({extended:false}),
        authors,
        books,
        publishers,
        users
    )
}