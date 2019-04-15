//your code here
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./poll.db")

let tables = [`CREATE TABLE voter (
	voterID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	first_name	TEXT,
	last_name	TEXT,
	gender	TEXT,
	age	TEXT
    )`, `CREATE TABLE politicians (
	candidateID	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	name	TEXT,
	party	TEXT,
	location	TEXT,
    grade_current	REAL
    )`, `CREATE TABLE votes (
    votesID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    voterID INTEGER,
    candidateID INTEGER,
    FOREIGN KEY(candidateID) REFERENCES politicians(candidateID),
	FOREIGN KEY(voterID) REFERENCES voter(voterID)
    )`]

for (let i = 0; i < tables.length; i++){
    db.run(tables[i], (err) => {
        console.log(err)
    })
}



