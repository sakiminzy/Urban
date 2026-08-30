CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  availability TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT NOT NULL,
  price TEXT,
  availability TEXT,
  date TEXT NOT NULL,
  location TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS workshops (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT NOT NULL,
  price TEXT,
  availability TEXT,
  date TEXT NOT NULL,
  location TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  itemType TEXT,
  itemId TEXT,
  itemTitle TEXT,
  bookingDate TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  preference TEXT NOT NULL,
  frequency TEXT NOT NULL,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  reviewerName TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  itemType TEXT NOT NULL,
  itemId TEXT NOT NULL,
  itemTitle TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
