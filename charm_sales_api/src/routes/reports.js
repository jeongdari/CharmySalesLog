const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Route to generate report
router.get('/generate', async (req, res) => {
  const { start_date, range } = req.query;
  const end_date = new Date(start_date);
  end_date.setDate(end_date.getDate() + 6);
  const formattedEndDate = end_date.toISOString().split('T')[0];

  console.log('Start Date:', start_date);
  console.log('End Date:', formattedEndDate);

  const query = `
    SELECT
      SUM(card_payment_amt) as total_card_payment,
      SUM(cash_payment_amt) as total_cash_payment,
      DATE_FORMAT(date, ?) as report_date
    FROM sales
    WHERE date BETWEEN ? AND ?
    GROUP BY report_date
  `;
  const format = range === 'daily' ? '%Y-%m-%d' : range === 'weekly' ? '%Y-%u' : '%Y-%m';

  try {
    console.log('Executing Query:', query, 'with parameters:', [format, start_date, formattedEndDate]);
    const [results] = await db.query(query, [format, start_date, formattedEndDate]);
    console.log('Query Results:', results);
    res.status(200).send(results);
  } catch (err) {
    console.error('Query Error:', err);
    res.status(500).send(err);
  }
});

module.exports = router;
