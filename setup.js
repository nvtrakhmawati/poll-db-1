//your code here
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./databases.db')

db.serialize(function(err){
    if (err){
        console.log(err)
    }else{
        db.run(`CREATE TABLE politican(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            party TEXT,
            location TEXT,
            grade_current INTEGER
        )`)
        db.run(`CREATE TABLE voters(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            gender TEXT,
            age INTEGER
        )`)
        db.run(`CREATE TABLE votes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            voterId INTEGER,
            politicianId INTEGER,
            FOREIGN KEY (voterId) REFERENCES voters(id),
            FOREIGN KEY (politicianId) REFERENCES politican(id)
        )`)
    }
})