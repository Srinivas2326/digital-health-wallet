const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// ✅ Absolute DB path (VERY IMPORTANT)
const dbPath = path.join(__dirname, "../healthwallet.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB connection error:", err.message);
  } else {
    console.log("✅ SQLite database connected at:", dbPath);
  }
});

// ✅ Enable foreign keys
db.serialize(() => {
  db.run(`PRAGMA foreign_keys = ON`);

  // =========================
  // USERS TABLE
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  // =========================
  // REPORTS TABLE
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      type TEXT NOT NULL,
      reportDate TEXT NOT NULL,
      vitals TEXT,
      filePath TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // =========================
  // VITALS TABLE
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS vitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      vitalType TEXT NOT NULL,
      value TEXT NOT NULL,
      recordedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // =========================
  // SHARED ACCESS TABLE
  // =========================
  db.run(`
    CREATE TABLE IF NOT EXISTS shared_access (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reportId INTEGER NOT NULL,
      sharedWith TEXT NOT NULL,
      permission TEXT DEFAULT 'read',
      FOREIGN KEY (reportId) REFERENCES reports(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
