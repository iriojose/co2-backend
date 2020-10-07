const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();


let app = express();
app.set('port', process.argv[2] || process.env.PAGES_PORT || 84);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const testFolder = path.join(__dirname, '../../public/pages');;

try {
    fs.readdirSync(testFolder).forEach(file => {
	app.use('/'+file, history());
        app.use('/'+file, express.static(path.resolve('public/pages/'+file+'/')));
    });
} catch (e) {
    console.log(e)
}


module.exports = app;