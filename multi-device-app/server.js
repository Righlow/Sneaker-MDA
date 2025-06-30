db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT
)`);

const categories = [
  ['New Arrivals', 'Latest equipment releases'],
  ['Trending', 'Popular fitness gear'],
  ['Brands', 'Top fitness brands'],
  ['Limited Stock', 'Exclusive / limited edition items'],
  ['Accessories', 'Equipment accessories']
];

console.log(`🚀 Kickstart Fitness server running on http://localhost:${PORT}`);