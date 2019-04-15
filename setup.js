//your code here
const db = require("./db")

db.serialize(function (err) {
  if (err) console.log(err)
  else {
    let createPoliticians = `CREATE TABLE politicians (id integer primary key autoincrement, name TEXT,party text, location text, grade_current integer)`
    let createVoters = `CREATE TABLE voters (id integer primary key autoincrement,first_name TEXT,last_name text, gender text, age integer)`
    let createVotes = `CREATE TABLE votes (id integer primary key autoincrement, voterID integer, politicianID integer, foreign key(politicianID) references politicians(id), foreign key(voterID) references voters(id))`
    /* 
    , politicianID integer, foreign key(id) references politicians(politicianID)
    */
    db.run(createPoliticians, function (err) {
      if (err) console.log(err);
      else console.log("successfully created table politicians")
    })
    db.run(createVoters, function (err) {
      if (err) console.log(err); 
      else console.log("successfully created table voters")
    })
    db.run(createVotes, function (err) {
      if (err) console.log(err); 
      else console.log("successfully created table votes")
    })
  }
})