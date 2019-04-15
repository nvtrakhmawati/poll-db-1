const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv','utf8').split('\n').map(x=>x.split(','))
const voters = fs.readFileSync('./voters.csv','utf8').split('\n').map(x=>x.split(','))
const votes = fs.readFileSync('./votes.csv','utf8').split('\n').map(x=>x.split(','))
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

// db.serialize(()=>{
//   let query = db.prepare(`INSERT INTO politicians VALUES (null,?,?,?,?)`)
//   for(let i = 1; i < politicians.length; i++){
//     query.run(politicians[i])
//   }
//   query.finalize((err)=>{
//     if(err){
//       console.log(err);
//     } else {
//       console.log(`Successfully insert to table politicians`);
//     }
//   })
// })

// db.serialize(()=>{
//   let query = db.prepare(`INSERT INTO voters VALUES (null,?,?,?,?)`)
//   for(let i = 1; i < voters.length; i++){
//     query.run(voters[i])
//   }
//   query.finalize((err)=>{
//     if(err){
//       console.log(err);
//     } else {
//       console.log(`Successfully insert to table voters`);
//     }
//   })
// })

db.serialize(()=>{
  let query = db.prepare(`INSERT INTO votes VALUES (null,?,?)`)
  for(let i = 1; i < votes.length;i++){
    query.run(votes[i])
  }
  query.finalize((err)=>{
    if(err){
      console.log(err);
    } else {
      console.log(`Successfully inserted to table votes`);
    }
  })
})