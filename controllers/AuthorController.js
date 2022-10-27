const AuthorServices = require('../services/AuthorServices')
const authorServices = new AuthorServices();

class AuthorController {
    static async index(req, res) {
        try {
            const authors = await authorServices.index();
            return res.status(200).json(authors);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async show(req, res) {
        try {
            const author = await authorServices.find(req.params.id);
            return res.status(200).json(author);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async store(req, res) {
        try {
            const newAuthor = await authorServices.store(req.body);
            return res.status(201).json(newAuthor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const updatedData = req.body;
        const { id } = req.params;
        try {
            await authorServices.update(updatedData,id);
            const updatedAuthor = await authorServices.find(id);
            return res.status(200).json(updatedAuthor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await authorServices.delete(id);
            return res.status(200).json({ success: 'Author deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async books(req, res) {
        try {
            const books = await authorServices.books(req.params.id)
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthorController;
