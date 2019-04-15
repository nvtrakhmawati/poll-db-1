const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const createPoliticians = `CREATE TABLE IF NOT EXISTS politicians (
                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT,
                           party TEXT,
                           location TEXT,
                           grade_current REAL);`

db.run(createPoliticians, (err) => {
  if(err){
    console.log(err);
  } else {
    console.log(`Has been Created TABLE Politicians`);
  }
})

// first_name,last_name,gender,age
const createVoters = `CREATE TABLE IF NOT EXISTS voters (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      first_name TEXT,
                      last_name TEXT,
                      gender TEXT,
                      age INTEGER);`

db.serialize(()=>{
  db.run(createVoters,(err)=>{
    if(err){
      console.log(err);
    } else {
      console.log(`Has been Created TABLE Voters`);
    }
  })
})

// voterId,politicianId,
const createVotes = `CREATE TABLE IF NOT EXISTS votes(
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     voterId INTEGER,
                     politicianId INTEGER,
                     FOREIGN KEY (voterId) REFERENCES voters (id)
                     FOREIGN KEY (politicianId) REFERENCES politicians (id))`

db.serialize(()=>{
  db.run(createVotes,(err)=>{
    if(err){
      console.log(err);
    } else {
      console.log(`Has been Created TABLE votes`);
    }
  })
})