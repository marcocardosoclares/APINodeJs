const PublisherServices = require('../services/PublisherServices')
const publisherServices = new PublisherServices();

class PublisherController {
    static async index(req, res) {
        try {
            const publishers = await publisherServices.index();
            return res.status(200).json(publishers);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async show(req, res) {
        try {
            const publisher = await publisherServices.show(req.params.id);
            return res.status(200).json(publisher);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async store(req, res) {
        try {
            const newPublisher = await publisherServices.store(req.body);
            return res.status(201).json(newPublisher);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const updatedData = req.body;
        const { id } = req.params;
        try {
            await publisherServices.update(updatedData,id);
            const updatedPublisher = await publisherServices.show(id);
            return res.status(200).json(updatedPublisher);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await publisherServices.delete(id);
            return res.status(200).json({ success: 'Publisher deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async books(req, res) {
        try {
            const books = await publisherServices.books(req.params.id)
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PublisherController;
