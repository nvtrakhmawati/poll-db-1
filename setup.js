//your code here
const db = require('sqlite3').verbose();
const database = new db.Database("./database.db");

database.run(`CREATE TABLE "politicians" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name"	TEXT,
	"party"	TEXT,
	"location"	TEXT,
	"grade_current"	INTEGER);`, function(err){
    if(err){
        console.log(err)
    }
})


database.run(`CREATE TABLE "voters" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"first_name"	TEXT,
	"last_name"	TEXT,
	"gender"	TEXT,
	"age"	INTEGER);`, function(err){
    if(err){
        console.log(err)
    }
})


database.run(`CREATE TABLE "votes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"politician_id"	TEXT,
	"voters_id"	TEXT);`, function(err){
    if(err){
        console.log(err)
    }
})





