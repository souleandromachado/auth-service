const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const SECRET = process.env.JWT_SECRET;

// Rota de cadastro
async function register(req, res) {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ error: 'Usuário já existe' });

  const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha
  await createUser(email, hashedPassword);

  res.status(201).json({ message: 'Usuário criado com sucesso' });
}

// Rota de login
async function login(req, res) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ error: 'Email ou senha inválidos' });

  const match = await bcrypt.compare(password, user.password); // Compara com o hash
  if (!match) return res.status(400).json({ error: 'Email ou senha inválidos' });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });

  res.json({ token });
}

module.exports = { register, login };
