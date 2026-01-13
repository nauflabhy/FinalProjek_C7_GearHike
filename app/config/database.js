// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db_service',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',  // ← HARUS ADA
  database: process.env.DB_NAME || 'db_gearhike',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test koneksi awal (AMAN SAAT DEMO)
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Connected");
    connection.release();
  } catch (error) {
    console.error("❌ MySQL Connection Failed:", error.message);
  }
})();

module.exports = pool;
