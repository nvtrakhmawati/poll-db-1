//your code here
const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./database.db');

const politicians = `CREATE TABLE "politicians" (
	"politician_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"party"	TEXT,
	"location"	TEXT,
	"grade_current"	REAL
);`

const voters = `CREATE TABLE "voters" (
	"voter_id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"gender"	TEXT
);`

const votes = `CREATE TABLE "votes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"voterId"	INTEGER,
	"politicianId"	INTEGER
);`

db.run(politicians, (err) => {
	if(err) console.log(err);
	else{
		console.log('successfully added politicians table');
	}
})

db.run(voters, (err) => {
	if(err) console.log(err);
	else{
		console.log('successfully added voters table');
	}
})

db.run(votes, (err) => {
	if(err) console.log(err);
	else{
		console.log('successfully added votes table');
	}
})

module.exports = db;