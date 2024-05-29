const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// Fetch user profile information
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [results] = await db.query('SELECT username, email, phone_number FROM Users WHERE user_id = ?', [user_id]);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
});

// Update profile
router.put('/update', async (req, res) => {
  const { user_id, email, phone_number } = req.body;
  try {
    await db.query('UPDATE Users SET email = ?, phone_number = ? WHERE user_id = ?', [email, phone_number, user_id]);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
});

// Delete account
router.delete('/delete', async (req, res) => {
    const { user_id } = req.body;
  
    try {
      const [result] = await db.query('DELETE FROM Users WHERE user_id = ?', [user_id]);
      console.log('Delete result:', result);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Account deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      res.status(500).json({ message: 'Error deleting account', error });
    }
  });

module.exports = router;
