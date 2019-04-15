const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

db.serialize(function() {
    db.run(`CREATE TABLE politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    );`, (err) => {
        if (err) {
            console.log(err)
        }
    });

    db.run(`CREATE TABLE voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    );`, (err) => {
        if (err) {
            console.log(err)
        }
    });

    db.run(`CREATE TABLE votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId INTEGER,
        politicianId INTEGER
    );`, (err) => {
        if (err) {
            console.log(err)
        }
    });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
});

// class View {
//     static print(thing) {
//         console.log(thing)
//     }
// }