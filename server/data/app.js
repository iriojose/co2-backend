const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const express = require('express');
dotenv.config();
const fs = require('fs');
const router = require('./router');

const app = express();



// SETTINGS
let f = new Date();
let fecha = f.getFullYear() + "" + (f.getMonth() + 1) + "" + f.getDate();
app.set('port', process.argv[2] || process.env.DATA_PORT || 83);


// MIDDLEWARES 

app.use(cors({ exposedHeaders: 'Authorization' }));
let logs = fs.createWriteStream(`logs/${fecha}.txt`, { flags: 'a' });
app.use(morgan({ stream: logs }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
router(app);

module.exports = app;