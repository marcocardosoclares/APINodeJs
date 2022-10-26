const Services = require('./Services')

class AuthorServices extends Services {
    constructor() {
        super('Authors')
    }

    async books(id) {
        const author = await super.show(id);
        return await author.getBooks();
    }
}

module.exports = AuthorServices;
