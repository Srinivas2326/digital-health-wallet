const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./healthwallet.db", (err) => {
  if (err) {
    console.error("DB connection error:", err.message);
  } else {
    console.log("SQLite database connected");
  }
});

db.serialize(() => {
  // USERS TABLE
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  // REPORTS TABLE ✅ (FIX)
  db.run(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      type TEXT,
      reportDate TEXT,
      vitals TEXT,
      filePath TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // VITALS TABLE (for next steps)
  db.run(`
    CREATE TABLE IF NOT EXISTS vitals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      vitalType TEXT,
      value TEXT,
      recordedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // SHARED ACCESS TABLE (for later)
  db.run(`
    CREATE TABLE IF NOT EXISTS shared_access (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reportId INTEGER,
      sharedWith TEXT,
      permission TEXT,
      FOREIGN KEY (reportId) REFERENCES reports(id)
    )
  `);
});

module.exports = db;
