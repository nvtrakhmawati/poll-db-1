const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the database.');
})

db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	db.run(`
		CREATE TABLE "Politicians" (
		"idPoliticians"	INTEGER PRIMARY KEY AUTOINCREMENT,
		"name" TEXT,
		"party"	TEXT,
		"location"	TEXT,
		"grade_current"	INTEGER
		);
		`)
	db.run(`
		CREATE TABLE "Voters" (
		"idVoters"	INTEGER PRIMARY KEY AUTOINCREMENT,
		"first_name"	TEXT,
		"last_name"	TEXT,
		"gender"	TEXT,
		"age"	INTEGER
		);
		`)
	db.run(`
		CREATE TABLE "Votes" (
		"idVotes"	INTEGER PRIMARY KEY AUTOINCREMENT,
		"idVoter" INTEGER,
		"idPolitician" INTEGER,
		FOREIGN KEY (idVoter) REFERENCES Voters(idVoters),
		FOREIGN KEY (idPolitician) REFERENCES Politicians(idPoliticians)
		);
		`)
	}
})
