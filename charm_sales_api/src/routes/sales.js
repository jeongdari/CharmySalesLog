const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Route to fetch a sales record
router.post('/get', async (req, res) => {
  const { date } = req.body;
  const query = 'SELECT * FROM Sales WHERE date = ?';
  try {
    const [results] = await pool.query(query, [date]);
    if (results.length > 0) {
      res.status(200).send(results[0]);
    } else {
      res.status(404).send({ message: 'No sales record found for the specified date' });
    }
  } catch (err) {
    console.error("Error fetching sales record:", err);
    res.status(500).send({ error: 'Server error', details: err });
  }
});

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
    console.error("Error updating sales record:", err);
    res.status(500).send(err);
  }
});

// Route to edit a sales record
router.put('/edit', async (req, res) => {
  const { date, card_payment_amt, cash_payment_amt } = req.body;
  const query = `
    UPDATE Sales
    SET card_payment_amt = ?, cash_payment_amt = ?, updated_at = CURRENT_TIMESTAMP
    WHERE date = ?;
  `;
  try {
    const [results] = await pool.query(query, [card_payment_amt, cash_payment_amt, date]);
    if (results.affectedRows === 0) {
      res.status(404).send({ message: 'No sales record found to update for the specified date' });
    } else {
      // Fetch the updated sales record
      const selectQuery = 'SELECT * FROM Sales WHERE date = ?';
      const [rows] = await pool.query(selectQuery, [date]);
      const updatedRecord = rows[0]; // Assuming only one record is updated

      res.status(200).send(updatedRecord);
    }
  } catch (err) {
    console.error("Error editing sales record:", err);
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
    console.error("Error deleting sales record:", err);
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
    console.error("Error fetching sales records:", err);
    res.status(500).send(err);
  }
});

// Route to get latest sales record
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
    console.error("Error fetching latest sales record:", err);
    res.status(500).json({ error: 'Server error', details: err });
  }
});

module.exports = router;
