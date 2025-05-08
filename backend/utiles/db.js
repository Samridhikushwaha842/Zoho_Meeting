// utils/db.js
// const mysql = require('mysql2/promise');

// // Update these values with your actual MySQL credentials and database name
// const db = mysql.createPool({
//   host: 'localhost',         // or your MySQL server address
//   user: 'root',              // your MySQL username
//   password: 'your_password', // your MySQL password
//   database: 'your_db_name',  // your database name
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
import User from '../models/User'; // ❌ REMOVE THIS LINE

const db = require('../utils/db');

async function getUsers() {
  const [rows] = await db.query('SELECT * FROM Users');
  return rows;
}


module.exports = db;
