//your code here
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const queryPoliticians =
    `CREATE TABLE politicians (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    party TEXT,
    location TEXT,
    grade_current REAL
    );`

db.run(queryPoliticians, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Success create table')
    }
})

const queryVoters =
    `CREATE TABLE voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    gender TEXT,
    age INTEGER
    );`

db.run(queryVoters, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Success create table')
    }
})

const queryVotes =
    `CREATE TABLE votes (
    voterId INTEGER,
    politicianId INTEGER
    );`

db.run(queryVotes, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Success create table')
    }
})