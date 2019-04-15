const db = require('./connector.js')

db.run(`CREATE TABLE IF NOT EXISTS politicians (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	name	TEXT,
	party	TEXT,
	location	TEXT,
	grade_current	INTEGER
);`)


db.run(`CREATE TABLE IF NOT EXISTS voters (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	first_name	TEXT,
	last_name	TEXT,
	gender	TEXT,
	age	INTEGER
);`)

db.run(`CREATE TABLE IF NOT EXISTS votes (
	id	INTEGER PRIMARY KEY AUTOINCREMENT,
	voterId	INTEGER,
	politicianId INTEGER
);`)


