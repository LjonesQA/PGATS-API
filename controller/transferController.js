const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  try {
    const transfer = transferService.transferValue(req.body);
    res.status(201).json(transfer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransfers = (req, res) => {
  try {
    res.json(transferService.getTransfers());
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
