const db = require('../db');

const addSale = async (req, res) => {
  const { user_id, date, card_payment_amt, cash_payment_amt } = req.body;

  if (!user_id || !date || !card_payment_amt || !cash_payment_amt) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO Sales (user_id, date, card_payment_amt, cash_payment_amt) VALUES (?, ?, ?, ?)',
      [user_id, date, card_payment_amt, cash_payment_amt]
    );

    res.status(201).json({ message: 'Sale record added successfully', saleId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error' });
  }
};

module.exports = {
  addSale,
};
