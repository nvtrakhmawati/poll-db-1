const db = require("./db")
const fs = require("fs")
const file_politicians = "./politicians.csv"
const file_voters = "./voters.csv"
const file_votes = "./votes.csv"

db.serialize(function() {
  let politicians = fs.readFileSync(file_politicians,"utf8").split("\r\n").slice(1)
  let voters = fs.readFileSync(file_voters,"utf8").split("\r\n").slice(1)
  let votes = fs.readFileSync(file_votes,"utf8").split("\r\n").slice(1)
  politicians.forEach((str,i) => {
    politicians[i] = politicians[i].split(",")
  })
  voters.forEach((str,i) => {
    voters[i] = voters[i].split(",")
  })
  votes.forEach((str,i) => {
    votes[i] = votes[i].split(",")
  })

  for(let i = 0; i < politicians.length; i++){
    db.run(`insert into politicians(name,party,location,grade_current) values(?, ?, ?, ?)`,politicians[i],function(err){
      if(err) console.log(err); 
      // else console.log(`successfully inserted ${politicians[i][0]}table politicians`)
    })
  }
  for(let i = 0; i < voters.length; i++){
    db.run(`insert into voters(first_name,last_name,gender,age) values(?, ?, ?, ?)`,voters[i],function(err){
      if(err) console.log(err); 
      // else console.log(`successfully inserted ${voters[i][0]}table voters`)
    })
  }
  for(let i = 0; i < votes.length; i++){
    db.run(`insert into votes(voterID, politicianID) values(?, ?)`,votes[i],function(err){
      if(err) console.log(err); 
      // else console.log(`successfully inserted ${voters[i][0]}table voters`)
    })
  }
})