//your code here
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err)=>{
    if(!err){
        console.log('successfuly created a database')
    }else{
        console.log(err)
    }
});

db.serialize(function() {
  db.run(`CREATE TABLE Politicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      party TEXT,
      location TEXT,
      grade_current REAL
  )`)
  db.run(`CREATE TABLE Voters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name TEXT,
      gender TEXT,
      age INTEGER
  )`);

  db.run(`CREATE TABLE Votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      voterId INTEGER,
      politicianId INTEGER
  )`)
});


