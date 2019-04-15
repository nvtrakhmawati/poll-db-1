//your code here
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.serialize((err) => {
  if (err) {
    console.log(err)
  } else {
    db.run(`CREATE TABLE Politicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      party	TEXT,
      location	TEXT,
      grade_current	INTEGER
    )`,(err) => {
      if (err) {
        console.log(err)
      } else {
      }
    })
    db.run(`CREATE TABLE Voters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT,
      last_name	TEXT,
      gender	TEXT,
      age	INTEGER
    )`,(err) => {
      if (err) {
        console.log(err)
      } else {
      }
    })
    db.run(`CREATE TABLE Votes (
      voterId INTEGER,
      politicianID INTEGER,
      FOREIGN KEY (voterId) REFERENCES Voter(id) 
      FOREIGN KEY (politicianId) REFERENCES Politician(id)      
    )`,(err) => {
      if (err) {
        console.log(err)
      } else {
      }
    })
  }
})