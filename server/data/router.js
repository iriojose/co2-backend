const sqlrouter = require('./sql/router');

module.exports = app => {
    app.use('/data/mysql/',sqlrouter);
}