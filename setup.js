var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./poll-db.db');

const CREATE_POLITICIANS_TABLE = `
CREATE TABLE IF NOT EXISTS "politicians" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "party" TEXT,
    "location" TEXT,
    "grade_current" REAL
)`

const CREATE_VOTERS_TABLE = `CREATE TABLE IF NOT EXISTS "voters" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"gender"	TEXT,
	"age"	INTEGER
);`;

const CREATE_VOTES_TABLE = `CREATE TABLE IF NOT EXISTS "votes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"voterId" INTEGER,
	"politicianID" INTEGER,
	FOREIGN KEY("voterId") REFERENCES voters(id),
	FOREIGN KEY("politicianId")	REFERENCES politicians(id)
);`;

db.run(CREATE_POLITICIANS_TABLE)
db.run(CREATE_VOTERS_TABLE)
db.run(CREATE_VOTES_TABLE)

module.exports = db