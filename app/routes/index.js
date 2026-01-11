const express = require('express');
const router = express.Router();
const db = require('../config/database');

// =====================
// HOME PAGE (ROOT)
// =====================
router.get('/', async (req, res) => {
  try {
    // 🔹 RINGKASAN CATEGORIES + JUMLAH GEAR
    const [categories] = await db.query(`
      SELECT c.id, c.name, COUNT(g.id) AS total_gears
      FROM categories c
      LEFT JOIN gears g ON c.id = g.category_id
      GROUP BY c.id, c.name
    `);

    // 🔹 DAFTAR GEARS
    const [gears] = await db.query(`
      SELECT g.*, c.name AS category_name
      FROM gears g
      JOIN categories c ON g.category_id = c.id
      ORDER BY g.id DESC
    `);

    res.render('index', { categories, gears });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// =====================
// CREATE GEAR
// =====================
router.post('/gears', async (req, res) => {
  const { category_id, name, weight, status } = req.body;

  await db.query(
    'INSERT INTO gears (category_id, name, weight, status) VALUES (?, ?, ?, ?)',
    [category_id, name, weight, status]
  );

  res.redirect('/');
});

// =====================
// DELETE GEAR
// =====================
router.post('/gears/delete/:id', async (req, res) => {
  await db.query('DELETE FROM gears WHERE id = ?', [req.params.id]);
  res.redirect('/');
});

// =====================
// UPDATE GEAR
// =====================
router.post('/gears/update/:id', async (req, res) => {
  const { category_id, name, weight, status } = req.body;

  await db.query(
    `UPDATE gears
     SET category_id=?, name=?, weight=?, status=?
     WHERE id=?`,
    [category_id, name, weight, status, req.params.id]
  );

  res.redirect('/');
});

module.exports = router;
