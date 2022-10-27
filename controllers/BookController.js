const BookServices = require('../services/BookServices.js')
const bookServices = new BookServices();

class BookController {
    static async index(req, res) {
        try {
            const books = await bookServices.index();
            return res.status(200).json(books);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async show(req, res) {
        try {
            const book = await bookServices.find(req.params.id);
            return res.status(200).json(book);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async store(req, res) {
        try {
            const newBook = await bookServices.store(req.body);
            return res.status(201).json(newBook);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const updatedData = req.body;
        const { id } = req.params;
        try {
            await bookServices.update(updatedData,id);
            const updatedBook = await bookServices.find(id);
            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await bookServices.delete(id);
            return res.status(200).json({ success: 'Book deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BookController;
