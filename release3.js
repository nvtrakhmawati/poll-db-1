const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

function search1() {
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`
    , (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    });
}

function search2() {
    db.all(`SELECT politicians.name, COUNT(votes.politicianId) AS 'totalVote'
    FROM politicians
    JOIN votes ON politicians.id = votes.politicianId
    WHERE politicians.name = 'Olympia Snowe';`
    , (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    });
}

function search3() {
    db.all(`SELECT politicians.name, COUNT(votes.politicianId) AS 'totalVote'
    FROM politicians
    JOIN votes ON politicians.id = votes.politicianId
    WHERE politicians.name LIKE 'Adam %'
    GROUP BY politicians.name;`
, (err, rows) => {
    if(err) {
        console.log(err)
    } else {
        console.log(rows)
    }
});
}

function search4() {
    db.all(`SELECT politicians.name, COUNT(votes.politicianId) AS 'totalVote'
    FROM politicians
    JOIN votes ON politicians.id = votes.politicianId
    GROUP BY politicians.name
    ORDER BY totalVote DESC
    LIMIT 3;`
, (err, rows) => {
    if(err) {
        console.log(err)
    } else {
        console.log(rows)
    }
});
}

function search5() {
    db.all(`WITH query1 AS (
        SELECT votes.voterId
        FROM politicians
        JOIN votes ON politicians.id = votes.politicianId
        WHERE politicians.name = 'Olympia Snowe'
    )
    SELECT voters.first_name, voters.last_name, voters.gender, voters.age
    FROM query1
    JOIN voters ON query1.voterId = voters.id;`
, (err, rows) => {
    if(err) {
        console.log(err)
    } else {
        console.log(rows)
    }
});
}

//Tests (Uncomment first)
// search1();
// search2();
// search3();
// search4();
// search5();