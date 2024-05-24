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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
