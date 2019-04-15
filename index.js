const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');
const fs = require("fs")

function createPolitician(name, party, location, grade_current) {
    const queryCreatePoliticians =
        `INSERT INTO politicians (name, party, location, grade_current)
    VALUES("${name}", "${party}", "${location}", "${grade_current}");`

    db.run(queryCreatePoliticians, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Success INSERT NEW DATA')
        }
    })
}

function updatePolitician(id, name, party, location) {

    const queryUpdatePoliticians = `UPDATE politicians SET name = "${name}", party = "${party}", location = "${location}"
    WHERE id = "${id}"`
    db.run(queryUpdatePoliticians, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Success DATA is UPDATED')
        }
    })
}

function deletePolitician(id) {
    const queryDeletePoliticians = `DELETE FROM politicians WHERE id = "${id}"`
    db.run(queryDeletePoliticians, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Success DATA is DELETED')
        }
    })
}

function findPolitician(findData) {
    const queryFindPoliticians =
        `SELECT name, party, grade_current FROM politicians
    WHERE party = ? AND grade_current BETWEEN ? AND ?`
    db.all(queryFindPoliticians, findData, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

function findTotalVotes(name) {
    const queryTotalVotes = `SELECT COUNT(politicianId) as totalVote, politicians.name
    FROM votes, politicians
    WHERE votes.politicianId = politicians.Id AND politicians.name = ?`
    db.all(queryTotalVotes, name, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

function findTotalVotesName(name) {
    const queryTotalVotesName = `SELECT politicians.name, COUNT(politicianId) as totalVote
    FROM votes, politicians
    WHERE politicians.id = votes.politicianId AND politicians.name LIKE ?
    GROUP BY politicians.name`

    db.all(queryTotalVotesName, name, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

function biggestVotesPoliticians() {
    const queryBiggestVotesPoliticians = `
    SELECT count(votes.voterId) as totalVote, politicians.name, politicians.party, politicians.location
    FROM votes, politicians WHERE votes.politicianId = politicians.id
    GROUP BY politicians.name
    order by totalVote DESC LIMIT 3`

    db.all(queryBiggestVotesPoliticians, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

function findVotersByPoliticianName(name) {
    const queryVotersByPoliticianName = `SELECT first_name, last_name, gender, age FROM voters, votes, politicians
    WHERE voters.id = votes.voterId AND votes.politicianId = politicians.id AND politicians.name = ?`
    db.all(queryVotersByPoliticianName, name, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

// createPolitician("Denny", "R", "WA", 10.265849)
// updatePolitician(1, "Denny", "D", "LA")
// deletePolitician(1)

// findPolitician(["R",9,11])
findTotalVotes("Olympia Snowe")
// findTotalVotesName("Adam%")
// biggestVotesPoliticians()
// findVotersByPoliticianName("Olympia Snowe")