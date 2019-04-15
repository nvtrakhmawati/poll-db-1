//your code here
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

db.serialize(function(){
    db.run(`CREATE TABLE politicians 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    party TEXT, 
    location TEXT, 
    grade_current REAL)`);

    db.run(`CREATE TABLE voters
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    first_name TEXT, 
    last_name TEXT, 
    gender TEXT, 
    age INTEGER)`);

    db.run(`CREATE TABLE votes (voterId INTEGER,
    politicianId INTEGER,
    FOREIGN KEY(voterId) 
    REFERENCES voters(id),
    FOREIGN KEY(politicianId) 
    REFERENCES politicians(id))`);  
})
module.exports = db;