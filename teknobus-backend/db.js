// db.js
require('dotenv').config(); // Muat variabel lingkungan dari .env

const mysql = require('mysql2/promise'); // Menggunakan versi promise dari mysql2

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'teknobus_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database!');
        connection.release(); // Lepaskan koneksi
    })
    .catch(err => {
        console.error('Error connecting to MySQL database:', err.message);
        process.exit(1); // Keluar dari aplikasi jika gagal terhubung ke DB
    });

module.exports = pool;