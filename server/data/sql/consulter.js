const chalk = require('chalk');

const { selectSQL, selectSQLOne, selectByFilter, makeInsert } = require('./querys');
const { disconnect } = require('./database')

/**
 * This function get all of the elements on the table
 * @param {string} model  model of the table 
 * @param {JSON} query paramaters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ``` 
 */
async function get(connection, model, query) {
    let sql = selectSQL(query, model);
    try {
        let data = await connection.query(sql);
        let response = JSON.parse(JSON.stringify(data[0]));
        
        await disconnect(connection);
        
        return response;
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        if(error.code === 'ER_NO_SUCH_TABLE'){
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error('BD_TABLE_ERROR');
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function return the object especified if exist
 * @param {string} model model of the table
 * @param {number} id id of the register in the table
 * @param {JSON} query paramaters to modify the consult
 * ```javascript
 *- query:{
 *-      fields:'id',
 *-      limit:50, 
 *-      offset:0,
 *-      order:'asc',
 *-      orderField:'id'
 *- }
 * ```
 */
async function getOne(connection, model, id, query) {
    let sql = selectSQLOne(id, query, model);
    try {
        let data = await connection.query(sql);
        if (!data[0][0]) return null;
        let response = JSON.parse(JSON.stringify(data[0][0]));

        await disconnect(connection);
        
        return response;
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}
async function getOneSubscription(connection,  id) {
    let sql = `SELECT * FROM subscripcion WHERE usuario_id=${id}`;
    try {
        let data = await connection.query(sql);
        if (!data[0][0]) return null;
        let response = JSON.parse(JSON.stringify(data[0][0]));
        await disconnect(connection);
        
        return response;
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}
/**
 * This function return a collection of objects filtered by other entity on the database
 * @param {string} model model of the table
 * @param {number} id id of register in the table
 * @param {string} other model of the other entity
 * @param {JSON} query parameters to modify the consult
 * ```
 * query:{fields:'id', limit:50, offset:0, order:'asc', orderField:'id'}
 * ```
 */
async function getOtherByMe(connection, model, id, other, query) {
    let sql = selectByFilter(query, other, model, id);
    try {
        let data = await connection.query(sql);

        await disconnect(connection);

        return data[0];
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function create a new register in the bd
 * @param {string} model model of the table
 * @param {JSON} object the new object to introduce in the db
 */
async function create(connection, model, object) {
    try {
        let inserted = await connection.query(`INSERT INTO ${model} set ?`, [object]);

        await disconnect(connection);
        
        return inserted[0];
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR' || error.code === 'ER_NO_REFERENCED_ROW_2') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        
        if(error.code==="ER_DUP_ENTRY"){
            throw new Error(`BD_DUPLICATE_ENTRY`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

async function insertMany(connection, model,array){
    try {
        let arrVals = [];
        array.forEach(element => {
            arrVals.push(Object.values(element));
        });
        let fields = makeInsert(array[0]);
        let inserted = await connection.query(`INSERT INTO ${model} (${fields}) VALUES ?`, [arrVals]);

        await disconnect(connection);
        
        return inserted[0];
    } catch (error) {
        if (error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR' || error.code === 'ER_NO_REFERENCED_ROW_2') {
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function update a register in the bd
 * @param {string} model model of the table
 * @param {number} id id of the register in the table
 * @param {JSON} object object to update in the db
 */
async function update(connection, model, id, object) {
    try {
        let updated = await connection.query(`UPDATE ${model} set ? WHERE id = ?`,[object,id]);

        await disconnect(connection);
        
        return updated[0];
    } catch (error) {
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR' || error.code === 'ER_NO_REFERENCED_ROW_2'){ 
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function delete a register from de bd
 * @param {string} model model of the table
 * @param {number} id id of the register
 */
async function remove(connection, model, id){
    try {
        let deleted = await connection.query(`DELETE FROM ${model} WHERE id = ? `,[id]);

        await disconnect(connection);
        
        return deleted;
    } catch (error) {
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    } 
}

/**
 * Execute a custom SQL sentence
 * @param {string} sql SQL sentence to execute
 */
async function query(connection, sql){
    try {
        let data = await connection.query(sql);

        await disconnect(connection);
        
        return data[0];
    } catch (error) {
        
        if(error.code === 'ER_PARSE_ERROR' || error.code === 'ER_BAD_FIELD_ERROR'){ 
            console.log(`${chalk.red('[ERROR]')} ${error}`);
            throw new Error(`BD_SYNTAX_ERROR`);
        }
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function return the total count of register in a table
 * @param {string} model model of the table
 */
async function count(connection, model){
    try {
        let count = await connection.query(`SELECT COUNT(id) as total FROM ${model}`);
        let total = count[0][0].total;

        await disconnect(connection);
        
        return total;
    } catch (error) {
        throw new Error(`[ERROR] Query just failed. \n ${error}`);
    }
}

/**
 * This function return the count of all register related to other table
 * @param {string} model the model of the table
 * @param {number} id the id of the register
 * @param {string} other the other table
 */
async function countOther(connection, model, id, other){
    try {
        let count = await connection.query(`SELECT COUNT(id) as total FROM ${other} WHERE ${model}_id = ${id}`);
        let total = count[0][0].total;

        await disconnect(connection);
        
        return total;
    } catch (error) {
        throw new Error(`[ERROR] Query just failed. \n ${other}`);
    }
}

/**
 * Library responsible for handling database queries
 */
module.exports = { 
    get, 
    getOne, 
    getOtherByMe, 
    create,
    insertMany,
    update, 
    remove, 
    query, 
    count, 
    countOther,
    getOneSubscription
};