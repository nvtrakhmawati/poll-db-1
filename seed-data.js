const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polldb1.db')

function insertPoliticians(){
    let dataPoliticians = fs.readFileSync('./politicians.csv','utf8').split('\n')
    dataPoliticians = dataPoliticians.map(el => el.split(','))
    db.serialize(()=>{
        let stmt = db.prepare('INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)')
        dataPoliticians.forEach(el => {
            if (el[0] !== 'name'){
                stmt.run(el[0], el[1], el[2], el[3])}
            }
        )
        finalizeData(stmt, 'Politicians')
    })
}

function insertVoters(){
    let dataVoters = fs.readFileSync('./voters.csv','utf8').split('\n')
    dataVoters = dataVoters.map(el => el.split(','))
    db.serialize(()=>{
        let stmt = db.prepare(`INSERT INTO Voters VALUES (null, ?, ?, ?, ?)`)
        dataVoters.map(el => {
            if (el[0] !== 'first_name'){
                stmt.run(el[0], el[1], el[2], el[3])
            }
        })
        finalizeData(stmt, 'Voters')
    })
}

function insertVotes(){
    let dataVotes = fs.readFileSync('./votes.csv','utf8').split('\n')
    dataVotes = dataVotes.map(el => el.split(','))
    db.serialize(()=>{
        let stmt = db.prepare(`INSERT INTO Votes VALUES (null, ?, ?)`)
        dataVotes.map(el => {
            if (el[0] !== 'voterId'){
                stmt.run(el[0],el[1])
            }
        })
        finalizeData(stmt, )
    })
}

function finalizeData(statement, data){
    statement.finalize((err)=>{
        if (err) console.log(`insert data ${data} failed`)
        else console.log(`insert data ${data} success`)
    })
}

insertPoliticians()
insertVoters()
insertVotes()