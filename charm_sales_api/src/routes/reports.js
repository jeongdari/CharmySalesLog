const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to generate report
router.get('/generate', (req, res) => {
  const { user_id, start_date, end_date, range } = req.query;
  const query = `
    SELECT
      SUM(card_payment) as total_card_payment,
      SUM(cash_payment) as total_cash_payment,
      DATE_FORMAT(date, ?) as report_date
    FROM sales
    WHERE user_id = ? AND date BETWEEN ? AND ?
    GROUP BY report_date
  `;
  const format = range === 'daily' ? '%Y-%m-%d' : range === 'weekly' ? '%Y-%u' : '%Y-%m';
  db.query(query, [format, user_id, start_date, end_date], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

module.exports = router;
