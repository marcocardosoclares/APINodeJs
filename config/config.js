require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_USER,
        password: process.env.DEV_PASSWORD,
        database: process.env.DEV_DATABASE,
        host: process.env.DEV_HOST,
        dialect: "postgres"
    },
    test: {
        username: "postgres",
        password: "postgres",
        database: "livros",
        host: "127.0.0.1",
        dialect: "postgres"
    },
    production: {
        username: process.env.PROD_USER,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DATABASE,
        host: process.env.PROD_HOST,
        dialect: "postgres"
    }
  };