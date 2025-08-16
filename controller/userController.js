const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// POST /register - Cria um novo usuário
router.post('/register', (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /login - Realiza login do usuário
router.post('/login', (req, res) => {
  try {
    const user = userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// GET /users - Lista todos os usuários
router.get('/users', (req, res) => {
  res.json(userService.getUsers());
});

module.exports = router;
