const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const Politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1, -1)
const formatPoliticians = []
for (let i = 0; i < Politicians.length; i++) {
    formatPoliticians.push(Politicians[i].split(','))
}

const Voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1, -1)
const formatVoters = []
for (let i = 0; i < Voters.length; i++) {
    formatVoters.push(Voters[i].split(','))
}

const Votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1, -1)
const formatVotes = []
for (let i = 0; i < Votes.length; i++) {
    formatVotes.push(Votes[i].split(','))
}

db.serialize(() => {
    var stmt = db.prepare(`INSERT INTO Politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)`)
    for (let i = 0; i < formatPoliticians.length; i++) {
        stmt.run(formatPoliticians[i][0] , formatPoliticians[i][1],formatPoliticians[i][2],formatPoliticians[i][3])
    }
    stmt.finalize()

    var stmt = db.prepare(`INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)`)
    for (let i = 0; i < formatVoters.length; i++) {
        stmt.run(formatVoters[i][0] , formatVoters[i][1],formatVoters[i][2],formatVoters[i][3])
    }
    stmt.finalize()

    var stmt = db.prepare(`INSERT INTO Votes (voterId, politicianId) VALUES (?, ?)`)
    for (let i = 0; i < formatVotes.length; i++) {
        stmt.run(formatVotes[i][0] , formatVotes[i][1])
    }
    stmt.finalize()
})