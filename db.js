var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll_db_1.db');

module.exports = db