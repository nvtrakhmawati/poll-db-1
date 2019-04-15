const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require("fs")

let dataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
db.serialize(() => {
    for (let i = 1; i < dataPoliticians.length; i++) {
        let splitData = dataPoliticians[i].split(',')
        for (let j = 0; j < splitData.length; j++) {
            var politiciansName = splitData[0]
            var politiciansParty = splitData[1]
            var politiciansLocation = splitData[2]
            var politiciansGrade = splitData[3]
        }
        const query = `INSERT INTO politicians(name, party, location, grade_current)
                                 VALUES ("${politiciansName}", "${politiciansParty}", "${politiciansLocation}", "${politiciansGrade}")`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Success')
            }
        })
    }
})

let dataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
db.serialize(() => {
    for (let i = 1; i < dataVoters.length; i++) {
        let splitData = dataVoters[i].split(',')
        for (let j = 0; j < splitData.length; j++) {
            var votersFirstName = splitData[0]
            var votersLastName = splitData[1]
            var votersGender = splitData[2]
            var votersAge = splitData[3]
        }
        const query = `INSERT INTO voters(first_name, last_name, gender, age)
                                 VALUES ("${votersFirstName}", "${votersLastName}", "${votersGender}", "${votersAge}")`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Success')
            }
        })
    }
})

let dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
db.serialize(() => {
    for (let i = 1; i < dataVotes.length; i++) {
        let splitData = dataVotes[i].split(',')
        for (let j = 0; j < splitData.length; j++) {
            var voterId = splitData[0]
            var politicianId = splitData[1]
        }
        const query = `INSERT INTO votes(voterId, politicianId)
                                VALUES ("${voterId}", "${politicianId}")`
        db.run(query, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('Success')
            }
        })
    }
})