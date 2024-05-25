// const express = require('express');
// const { addSale } = require('../controllers/salesController');

// const router = express.Router();

// router.post('/', addSale);

// module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Route to add a sales record
router.post('/add', async (req, res) => {
  const { user_id, date, card_payment, cash_payment } = req.body;
  const query = 'INSERT INTO sales (user_id, date, card_payment, cash_payment) VALUES (?, ?, ?, ?)';
  try {
    const [result] = await pool.query(query, [user_id, date, card_payment, cash_payment]);
    res.status(200).send({ message: 'Sales record added successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get sales records
router.get('/list', async (req, res) => {
  const { user_id, start_date, end_date } = req.query;
  const query = 'SELECT * FROM sales WHERE user_id = ? AND date BETWEEN ? AND ?';
  try {
    const [results] = await pool.query(query, [user_id, start_date, end_date]);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

