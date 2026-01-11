const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view')); // ⬅️ FIX DI SINI

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});
