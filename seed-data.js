const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
let politician = fs.readFileSync('./politicians.csv','utf8').split('\n').slice(1).map(el=>{return el.split(',')})
let voters = fs.readFileSync('./voters.csv','utf8').split('\n').slice(1).map(el=>{return el.split(',')})
let votes = fs.readFileSync('./votes.csv','utf8').split('\n').slice(1).map(el=>{return el.split(',')})

db.serialize(function(){
    let stmtPolitician = db.prepare(`INSERT INTO Politicians(name,party,location,grade_current)
    VALUES (?,?,?,?)`)
    politician.forEach(el=>{
        stmtPolitician.run(el[0],el[1],el[2],el[3])
    })
    stmtPolitician.finalize(err=>{
        if(err)console.log(err)
        else console.log('berhasil insert data to politicians')
    })

    let stmtVoters = db.prepare(`INSERT INTO Voters(first_name,last_name,gender,age)
    VALUES(?,?,?,?)`)
    voters.forEach(el=>{
        stmtVoters.run(el[0],el[1],el[2],el[3])
    })
    stmtVoters.finalize(err=>{
        if(err)console.log(err)
        else console.log('berhasil insert data to voters')
    })
    
    let stmtVotes = db.prepare(`INSERT INTO Votes(voterId,politicianId)
    VALUES(?,?)`)
    votes.forEach(el=>{
        stmtVotes.run(el[0],el[1])
    })
    stmtVotes.finalize(err=>{
        if(err) console.log(err)
        else console.log('berhasil insert data to Votes')
    })
})