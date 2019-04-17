const db = require('./connection')
const fs = require('fs')

let getPoliticians = fs.readFileSync('politicians.csv')
.toString()
.split("\n")
getPoliticians = getPoliticians.slice(1,getPoliticians.length-1)
let getvoters = fs.readFileSync('voters.csv')
.toString()
.split('\n')
getvoters = getvoters.slice(1,getvoters.length-1)
let getVotes = fs.readFileSync('votes.csv')
.toString()
.split('\n')
getVotes = getVotes.slice(1, getVotes.length-1)
console.log(getPoliticians);
let politiciansQueries = `INSERT INTO Politicians VALUES(null,?,?,?,?)`
let votersQueries = `INSERT INTO Voters VALUES(null,?,?,?,?)`
let votesQueries = `INSERT INTO Votes VALUES(null,?,?)`

function seedData(queries, getData) {
    db.serialize(function () {
        let dataSeeding = db.prepare(queries)
        getData.forEach(data => {
            let splitData = data.split(',')
            dataSeeding.run(splitData)
        });
        
        dataSeeding.finalize(function (err) {
            if(err) throw err
            console.log('data masuk');
            
            
        })
        
    })
}

seedData(politiciansQueries, getPoliticians)
seedData(votersQueries, getvoters)
seedData(votesQueries, getVotes)
db.close()