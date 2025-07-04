const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development); // Inicializa o Knex com config do ambiente
module.exports = db;
