const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
