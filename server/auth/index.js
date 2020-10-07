const app = require('./app');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

app.listen(app.get('port'));
console.log(`${chalk.yellow('[SERVER]')} running on port ${app.get('port')}`);