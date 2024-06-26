const express = require('express');
const router = express.Router();
const pool = require('../config/db');

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
    const [results] = await pool.query(query, [format, formattedStartDate, formattedEndDate]);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ error: 'Internal server error' });
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
    const [results] = await pool.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching recent sales data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/weekly-sales', async (req, res) => {
  try {
    const query = 'SELECT week_year, total_sales, average_daily_sales FROM WeeklyAggregatedSales ORDER BY week_year ASC';
    const [results] = await pool.query(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching weekly sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/monthly-sales', async (req, res) => {
  try {
    const query = `
      SELECT month_year, total_sales, average_daily_sales 
      FROM MonthlyAggregatedSales 
      WHERE month_year < DATE_FORMAT(NOW(), '%Y-%m')
      ORDER BY month_year DESC 
      LIMIT 12
    `;
    const [results] = await pool.query(query);
    res.status(200).json(results.reverse()); // Reverse to show the oldest month first
  } catch (error) {
    console.error('Error fetching monthly sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
