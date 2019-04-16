//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

politiciansquery = 
`CREATE TABLE politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current INTEGER      
);`

votersquery =
`CREATE TABLE voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
);`

votesquery =
`CREATE TABLE votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    voters_id INTEGER,
    politicians_id INTEGER
)`

db.serialize( () => {
    db.run(politiciansquery, (err) => {
        if (err) {
            console.log(err)
        }
    });
    db.run(votersquery, (err) => {
        if (err) {
            console.log(err)
        }
    });
    db.run(votesquery, (err) => {
        if (err) {
            console.log(err)
        }
    });
})

module.exports = db;