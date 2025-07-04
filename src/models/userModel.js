const db = require('../db/knex');

// Cria usuário no banco
async function createUser(email, hashedPassword) {
  return await db('users').insert({ email, password: hashedPassword });
}

// Busca usuário por email
async function findUserByEmail(email) {
  return await db('users').where({ email }).first();
}

module.exports = { createUser, findUserByEmail };
