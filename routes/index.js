const bodyParser = require('body-parser');
const authors = require('./authorRoutes');
const books = require('./bookRoutes');
const publishers = require('./publisherRoutes');
const users = require('./userRoutes');
const auth = require('./authRoutes');

module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({extended:false}),
        auth,
        authors,
        books,
        publishers,
        users
    )
}