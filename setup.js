const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.run(`CREATE TABLE Politicians(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current TEXT
)`, err => {
        if (err) console.log(`Table politicians error`)
        else console.log(`Table politicians berhasil`)
    })

db.run(`CREATE TABLE Voters(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
)`, err => {
        if (err) console.log(`Table voters error`)
        else console.log(`Table voters berhasil`)
    })

db.run(`CREATE TABLE Votes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voterId INTEGER,
    politicianId INTEGER
)`, err => {
        if (err) console.log(`Table votes error`)
        else console.log(`Table votes berhasil`)
    })