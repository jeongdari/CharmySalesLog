const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Helper function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to validate a date string
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

// Route to generate report
router.get('/generate', async (req, res) => {
  const { user_id, start_date, end_date, range } = req.query;

  if (!start_date || !isValidDate(start_date)) {
    return res.status(400).json({ message: 'Invalid start_date' });
  }

  const startDate = new Date(start_date);
  const endDate = end_date && isValidDate(end_date) ? new Date(end_date) : addDays(startDate, 7);

  const formattedStartDate = startDate.toISOString().split('T')[0];
  const formattedEndDate = endDate.toISOString().split('T')[0];

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
    const [results] = await db.query(query, [format, formattedStartDate, formattedEndDate]);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/recent', async (req, res) => {
  const query = `
    SELECT
      SUM(card_payment_amt) as total_card_payment,
      SUM(cash_payment_amt) as total_cash_payment,
      DATE(date) as report_date
    FROM sales
    WHERE date >= (
      SELECT MIN(date) 
      FROM (
        SELECT date 
        FROM sales 
        ORDER BY date DESC 
        LIMIT 7
      ) AS subquery
    )
    GROUP BY report_date
    ORDER BY report_date
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results); // Ensure JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' }); // Ensure JSON response on error
  }
});

module.exports = router;
