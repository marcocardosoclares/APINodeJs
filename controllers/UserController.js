const UserServices = require('../services/UserServices')
const userServices = new UserServices();
const bcrypt = require('bcrypt');

class UserController {
    static async index(req, res) {
        try {
            const users = await userServices.index();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async show(req, res) {
        try {
            const user = await userServices.show(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async store(req, res) {
        const {name, email, password } = req.body;
        console.log(password)
        const hashPass = bcrypt.hash(password, 12)
        try {
            const newUser = await userServices.store({name, email, password: hashPass});
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        const updatedData = req.body;
        const { id } = req.params;
        try {
            await userServices.update(updatedData,id);
            const updatedUser = await userServices.show(id);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            await userServices.delete(id);
            return res.status(200).json({ success: 'User deleted' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
