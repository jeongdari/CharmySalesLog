const mysql = require('mysql2/promise'); // Use promise-based connection

require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL server');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL server:', err.stack);
  });

module.exports = pool;
