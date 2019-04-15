//your code here

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');


db.serialize(function (){
    db.run(`CREATE TABLE "politicians" (
        "politicianId"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "party"	TEXT,
        "location"	TEXT,
        "grade_current"	INTEGER
    );`)

    db.run(`CREATE TABLE "voters" (
        "voterId"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "first_name"	TEXT,
        "last_name"	TEXT,
        "gender"	TEXT,
        "age"	INTEGER
    );`)

    db.run(`CREATE TABLE "votes" (
        "votesId" INTEGER PRIMARY KEY AUTOINCREMENT,
        "voterId"	INTEGER,
        "politicianId"	INTEGER
    );`)
})

module.exports= db