const { Router } = require('express');
const router = Router();

const chalk = require('chalk');
const { connect } = require('./database');

const { get, getOne, getOtherByMe, create, insertMany, update, remove, query, count, countOther } = require('./consulter');

const axiosUtils = require("../../auth/encript")
let { getTenantId } = axiosUtils;

router.get('/count/:table', async (req, res) =>{
    let { table } = req.params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id:  tenantId })
        let response = await count(db, table);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        return res.status(500).json({ error: error });
    }           
});

router.get('/count/:table/:id/:other/', async (req, res) =>{
    let { table, id, other } = req.params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await countOther(db, table, id, other);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        return res.status(500).json({ error: error });
    } 
});

router.get('/:table/', async (req, res) => {
    let { params, query } = req;
    let { table } = params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await get(db, table, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }

});

router.get('/:table/:id', async (req, res) => {
    let { params, query } = req;
    let { table, id } = params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await getOne(db, table, id, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.get('/:table/:id/:other/', async (req, res) => {
    let { params, query } = req;
    let { table, id, other } = params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await getOtherByMe(db, table, id, other, query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/query/', async (req, res) =>{
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let { sql } = req.body;
        let response = await query(db, sql);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table', async (req, res)=>{
    let { params, body } = req;
    let { table } = params;
    let { data } = body;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await create(db, table, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        if (error.message === 'BD_DUPLICATE_ENTRY') return res.status(406).json({ error: 'duplicate entry' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table/many',async (req, res)=>{
    let { params, body } = req;
    let { table } = params;
    let { data } = body;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await insertMany(db, table, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.post('/:table/:id', async (req, res)=>{
    let { params, body } = req;
    let { table, id } = params;
    let { data } = body;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await update(db, table, id, data);
        return res.status(201).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});

router.delete('/:table/:id', async (req, res)=>{
    let { params } = req;
    let { table, id } = params;
    try {
        let tenantId = getTenantId(req);
        let db = connect({ id: tenantId })
        let response = await remove(db, table,id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(`${chalk.red('[ERROR]')} ${error}`);
        if (error.message === 'BD_SYNTAX_ERROR') return res.status(400).json({ error: 'Invalid query' });
        if (error.message === 'BD_TABLE_ERROR') return res.status(404).json({ error: 'Invalid table' });
        return res.status(500).json({ error: error });
    }
});



module.exports = router;