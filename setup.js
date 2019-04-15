const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.run(`
        CREATE TABLE IF NOT EXISTS Politicians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            party TEXT,
            location TEXT,
            grade_current INTEGER
        )
    `, err =>{
        if(err) console.log(err)
        else console.log('berhasil create tabel Politicans')
    })

db.run (`
        CREATE TABLE IF NOT EXISTS Voters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            gender TEXT,
            age INTEGER
        )
    `,err =>{
        if(err) console.log(err)
        else console.log('berhasil create tabel Voters')
    })

db.run (`
        CREATE TABLE IF NOT EXISTS Votes (
            voterId INTEGER REFERENCES Voters(id),
            politicianId INTEGER REFERENCES Politicians(id)
        )
    ` , err =>{
        if(err) console.log(err)
        else console.log('berhasil create tabel votes')
    })