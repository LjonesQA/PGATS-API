const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

// POST /transfer - Cria uma nova transferência
router.post('/', (req, res) => {
  try {
    const transfer = transferService.transferValue(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /transfer - Lista todas as transferências
router.get('/', (req, res) => {
  try {
    res.json(transferService.getTransfers());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
