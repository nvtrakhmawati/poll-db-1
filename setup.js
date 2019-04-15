//your code here
const sqlite3   = require('sqlite3').verbose();
const db        = new sqlite3.Database('./database.db');


db.serialize(function(){
    // db.run(
    //     `CREATE TABLE politicians (
    //         id	INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name	TEXT,
    //         party	TEXT,
    //         location	TEXT,
    //         currentGrade	NUMERIC
    //     );`
    // )
    // db.run(
    //     `CREATE TABLE voters (
    //         id	INTEGER PRIMARY KEY AUTOINCREMENT,
    //         firstName	TEXT,
    //         lastName	TEXT,
    //         gender	TEXT,
    //         age	INTEGER
    //     );`
    // )
    // db.run(
    //     `CREATE TABLE votes (
    //         id	INTEGER PRIMARY KEY AUTOINCREMENT,
    //         voterId	INTEGER,
    //         politicianId	INTEGER,
    //         FOREIGN KEY (voterId) REFERENCES voters(id),
    //         FOREIGN KEY (politicianId) REFERENCES politicians(id)
    //     );`
    // )
})

module.exports = db


// const db = require('./db');
// const args = process.argv.slice(2)
// const query = `INSERT INTO people(name, phone_number, email)
//                 VALUES ('${args[0]}', '${args[1]}', '${args[2]}')`;

// db.run(query, function (err){
//     if(err) throw err;
//     console.log('Succesfully created a new row!');
// });
    

