const express = require('express');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server:', err.stack);
    return;
  }
  console.log('Connected to MySQL server');
});

// Example route to fetch users from the database
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying database:', err.stack);
      res.status(500).send('Error querying database');
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
