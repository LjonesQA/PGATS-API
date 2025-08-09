const transferService = require('../service/transferService');
const { authenticate } = require('../service/userService');

exports.transfer = (req, res) => {
  try {
    const token = req.headers['authorization'];
    authenticate(token);
    const transfer = transferService.transferValue(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  try {
    const token = req.headers['authorization'];
    authenticate(token);
    res.json(transferService.getTransfers());
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
