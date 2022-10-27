const Services = require('./Services')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthServices extends Services {
    constructor() {
        super('Users')
    }

    async login(email, password) {
        const user = await super.find({ email });
            
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "5d" }
            );

            user.token = token;

            return user;
        }
    }
}

module.exports = AuthServices;
