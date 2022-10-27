const Services = require('./Services')

class PublisherServices extends Services {
    constructor() {
        super('Publishers')
    }

    async books(id) {
        const publisher = await super.find(id);
        return publisher.getBooks();
    }
}

module.exports = PublisherServices
