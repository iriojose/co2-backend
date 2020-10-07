const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const router = require('./router');

const app = express();



// SETTINGS

app.set('port', process.argv[2] || process.env.AUTH_PORT || 82);


// MIDDLEWARES 

app.use(cors({ exposedHeaders: 'Authorization' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth/',router);

module.exports = app;