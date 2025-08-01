const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'multi-device-app/public')));
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'multi-device-app/public', 'index.html'));
});

// Parse JSON bodies
app.use(express.json());

// Open or create the database file
const db = new sqlite3.Database('./mydatabase.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create categories table if not exists
db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT
)`);

// Create products table if not exists
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  condition_status TEXT NOT NULL,
  size_us TEXT NOT NULL,
  size_uk TEXT NOT NULL,
  image_data TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// API Routes
app.get('/api/products', (req, res) => {
  db.all("SELECT * FROM products ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/products', (req, res) => {
  const { name, price, condition_status, size_us, size_uk, image_data } = req.body;
  
  db.run(`INSERT INTO products (name, price, condition_status, size_us, size_uk, image_data) 
          VALUES (?, ?, ?, ?, ?, ?)`,
    [name, price, condition_status, size_us, size_uk, image_data],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ 
        id: this.lastID,
        message: 'Product added successfully'
      });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Kickstart Sneakers server running on http://localhost:${PORT}`);
  console.log(`📱 Access your app at: http://localhost:${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});