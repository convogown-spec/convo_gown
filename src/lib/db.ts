import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "gallery.db");

// Declare global type helper for hot reloading in development
declare global {
  var _sqliteDb: Database.Database | undefined;
}

let db: Database.Database;

if (process.env.NODE_ENV === "production") {
  db = new Database(dbPath);
} else {
  if (!global._sqliteDb) {
    global._sqliteDb = new Database(dbPath);
  }
  db = global._sqliteDb;
}

// Optimize SQLite for high performance
db.pragma("journal_mode = WAL");

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    session_id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    attempts INTEGER NOT NULL,
    last_attempt INTEGER NOT NULL
  );
`);

export default db;
