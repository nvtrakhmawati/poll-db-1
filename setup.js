//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');


(`CREATE TABLE "politicians" (
    "politician_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
    "Name"	TEXT NOT NULL,
    "Party"	TEXT NOT NULL,
    "Location"	TEXT,
    "Grade_current"	INTEGER
);`)

(`CREATE TABLE "voters" (
	"voters_id"	INTEGER,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"gender"	TEXT,
	"age"	INTEGER
)`)

(`CREATE TABLE "votes" (
	"voter_id"	INTEGER,
	"politician_id"	INTEGER
)`)