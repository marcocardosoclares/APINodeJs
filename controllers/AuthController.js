const AuthServices = require('../services/AuthServices')
const authServices = new AuthServices();

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await authServices.login(email, password);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
