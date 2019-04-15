//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polldb1.db')

function createPoliticians(){
    let query = `CREATE TABLE IF NOT EXISTS "Politicians" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"	TEXT,
        "party"	TEXT,
        "location"	TEXT,
        "grade_current"	REAL
    );`
    dbRun(query, 'Politicians')
}

function createVoters(){
    let query = `CREATE TABLE IF NOT EXISTS "Voters" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "first_name"	TEXT,
        "last_name"	TEXT,
        "gender"	TEXT,
        "age"	INTEGER
    );`
    dbRun(query, 'Voters')
}

function createVotes(){
    let query = `CREATE TABLE IF NOT EXISTS "Votes" (
        "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
        "voterId"	INTEGER REFERENCES Voters(id),
        "politicianId"	INTEGER REFERENCES Politicians(id)
    );`
    dbRun(query, 'Votes')
}

function dbRun(query, tableName){
    db.run(query, (err)=>{
        if (err) console.log(`cretae table failed : ${err.message}`)
        else console.log(`create table ${tableName} success`)
    })
}

createPoliticians()
createVoters()
createVotes()

