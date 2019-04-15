const fs =require('fs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dataBase.db');   

 // POLITICIAN INSERT DATA

let politicianList = fs.readFileSync('politicians.csv','utf8').split('\n');
let eachPL = [];

for (let i = 0; i < politicianList.length; i++) {
    eachPL.push(politicianList[i].split (','))
}

db.serialize(function () {

    for (let i = 1; i < eachPL.length; i++) {
        let query = `INSERT INTO politician (${eachPL[0][0]}, ${eachPL[0][1]}, ${eachPL[0][2]}, ${eachPL[0][3]})
        VALUES ('${eachPL[i][0]}','${eachPL[i][1]}','${eachPL[i][2]}','${eachPL[i][3]}')`
    
        // console.log(query)
        // db.run(query)
    }
}
)

// VOTERS INPUT DATA

let votersList = fs.readFileSync('voters.csv','utf8').split('\n')
let eachVrL = []

for (let i = 0; i < votersList.length; i++) {
    eachVrL.push(votersList[i].split (','))
}
// console.log (eachVrL)

db.serialize(function () {

    for (let i = 1; i < eachVrL.length; i++) {
        let query = `INSERT INTO voters (${eachVrL[0][0]}, ${eachVrL[0][1]}, ${eachVrL[0][2]}, ${eachVrL[0][3]})
        VALUES ('${eachVrL[i][0]}',"${eachVrL[i][1]}",'${eachVrL[i][2]}','${eachVrL[i][3]}')`
    
        // console.log(query)
        // db.run(query)
    }
}
)

// VOTES INPUT DATA

let votesList = fs.readFileSync('votes.csv','utf8').split('\n')
let eachVL = []

for (let i = 0; i < votesList.length; i++) {
    eachVL.push(votesList[i].split (','))
}

db.serialize(function () {

    for (let i = 1; i < eachVL.length; i++) {
        let query = `INSERT INTO votes (${eachVL[0][0]}, ${eachVL[0][1]})
        VALUES ("${eachVL[i][0]}","${eachVL[i][1]}")`
    
        console.log(query)
        db.run(query)
    }
}
)
// console.log (eachVL)