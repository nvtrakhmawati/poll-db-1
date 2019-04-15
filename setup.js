//your code here
// let politicians = './politicians.csv'
// let voters = './voters.csv'
// let votes = './votes.csv'

// var sqlite3 = require('./sqlite-crud/node_modules/sqlite3').verbose(); //masih bingung dengan sqlite3 ini path ny yg mana
var sqlite3 = require('./sqlite-crud/sqlite3').verbose();
// const sqlite3  = require('sqlite3').verbose(); //masih bingung dengan sqlite3 ini path ny yg mana
const db = new sqlite3.Database('./sqlite-crud/polldb1.db');

	db.serialize(function() {
		// db.serialize(err) => {
		// if(err){
		// 	console.log(err)
		// }else{
				db.run(`CREATE TABLE "Candidates" (
			"politicianId"	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
			"name"	TEXT,
			"party"	TEXT,
			"location"	TEXT,
			"grade_current"	INTEGER
		);`)
				db.run(`CREATE TABLE "Voters" (
			"voterId"	INTEGER UNIQUE,
			"first_name"	TEXT,
			"last_name"	TEXT,
			"gender"	TEXT,
			"age"	INTEGER,
			PRIMARY KEY("voterId")
		);`)
				db.run(`CREATE TABLE "Votes" (
			"pollvoteId"	INTEGER UNIQUE,
			"voterId"	INTEGER,
			"politicianId"	INTEGER,
			PRIMARY KEY("pollvoteId")
		);`)

	})



// module.exports = setup