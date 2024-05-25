const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup
router.post('/signup', async (req, res) => {
  const { username, password, email, phone_number } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO Users (username, password, email, phone_number) VALUES (?, ?, ?, ?)', [username, hashedPassword, email, phone_number]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Username does not exist' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

