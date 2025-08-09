const { users } = require('../model/userModel');
const crypto = require('crypto');
const tokens = {};

function registerUser({ username, password, favorecidos = [] }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, favorecidos };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error('Login ou senha inválidos');
  }
  // Gera um token simples (não seguro, apenas para fins didáticos)
  const token = crypto.randomBytes(16).toString('hex');
  tokens[token] = username;
  return { user, token };
}

function authenticate(token) {
  const username = tokens[token];
  if (!username) throw new Error('Token inválido ou ausente');
  return getUser(username);
}

function getUsers() {
  return users;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

module.exports = {
  registerUser,
  loginUser,
  authenticate,
  getUsers,
  getUser,
};
