//your code here
const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


// db.run(`CREATE TABLE politicians(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     party TEXT,
//     location TEXT,
//     grade_current NUMERIC)`)

// db.run(`CREATE TABLE voters(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name TEXT,
//     last_name TEXT,
//     gender TEXT,
//     age NUMERIC)`)

// db.run(`CREATE TABLE votes(
//     voterId INTEGER,
//     politicianId INTEGER,
//     FOREIGN KEY (voterId) REFERENCES voters(id),
//     FOREIGN KEY (politicianId) REFERENCES politicians(id))`)

module.exports = db