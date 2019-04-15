var sqlite3 = require('sqlite3').verbose();
const db       = new sqlite3.Database('./sqlite-crud/polldb1.db');

module.exports = db;