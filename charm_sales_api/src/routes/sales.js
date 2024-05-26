const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Route to update a sales record
router.post('/update', async (req, res) => {
  const { date, card_payment_amt, cash_payment_amt } = req.body;
  const query = `
    INSERT INTO Sales (date, card_payment_amt, cash_payment_amt)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      card_payment_amt = VALUES(card_payment_amt),
      cash_payment_amt = VALUES(cash_payment_amt),
      updated_at = CURRENT_TIMESTAMP;
  `;
  try {
    await pool.query(query, [date, card_payment_amt, cash_payment_amt]);
    
    // Fetch the updated sales record
    const selectQuery = 'SELECT * FROM Sales WHERE date = ?';
    const [rows] = await pool.query(selectQuery, [date]);
    const updatedRecord = rows[0]; // Assuming only one record is updated

    res.status(200).send(updatedRecord);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to delete a sales record
router.delete('/delete', async (req, res) => {
  const { date } = req.body;
  const query = 'DELETE FROM Sales WHERE date = ?';
  try {
    await pool.query(query, [date]);
    res.status(200).send({ message: 'Sales record deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get sales records
router.get('/list', async (req, res) => {
  const { start_date, end_date } = req.query;
  const query = 'SELECT * FROM Sales WHERE date BETWEEN ? AND ?';
  try {
    const [results] = await pool.query(query, [start_date, end_date]);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/latest', async (req, res) => {
  const query = 'SELECT * FROM Sales ORDER BY date DESC LIMIT 1';
  try {
    const [results] = await pool.query(query);
    if (results.length > 0) {
      res.status(200).json({ data: results[0] });
    } else {
      res.status(200).json({ data: null, message: 'No sales record found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err });
  }
});


module.exports = router;
