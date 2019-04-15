var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dataBase.db');                                                                       


// db.run ( `CREATE TABLE politician (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT ,
//     party TEXT,
//     location TEXT,
//     grade_current INT
//     )`)

// db.run ( `CREATE TABLE voters (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     first_name TEXT,
//     last_name TEXT,
//     gender TEXT,
//     age INT
// )`)

// db.run ( `CREATE TABLE votes (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     voterId INT,
//     politicianID
// )`)


module.exports = db
