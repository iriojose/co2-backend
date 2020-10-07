const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    database:{
        host: process.env.DATABASE_URI,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
}