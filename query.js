const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').map(x => x.split(','))
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').map(x => x.split(','))
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').map(x => x.split(','))
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const create = (tableName, value) => {
  let dynamicValue = Array.from({length: value.length+1}, (v, i) => i === 0 ? 'null' : '?').join(', ')

  let query = `INSERT INTO ${tableName}
              VALUES
              (${dynamicValue})`

  db.run(query, value, (err) => {
    if (err) console.log(err.message)
    else console.log(`berhasil menambahkan data di table ${tableName}`)
  })
}

const update = (tableName, field, value, id) => {
  let dynamicValue = Array.from(field, (v) => v + ' = ?').join(', ')

  let query = `UPDATE ${tableName}
              SET ${dynamicValue}
              WHERE ${tableName}.id = ${id}`

    db.run(query, value, err => {
      if (err) console.log(err.message)
      else console.log('berhasil update')
    })
}

const deleteData = (tableName, id) => {
  let query = `DELETE FROM ${tableName}
              WHERE ${tableName}.id = ${id}`

  db.run(query, (err) => {
    if (err) console.log(err)
    else console.log('berhasil menghapus data')
  })
}
// create('Politicians', ['Dienul', 'M', 'DK', '19.64634133'])
// update('Politicians', ['name', 'party', 'location', 'grade_current'], ['Dienul haq', 'G', 'US', '19.5362423'], 22)
// deleteData('Politicians', 22)

// let query = `SELECT name,party,grade_current FROM politicians
// WHERE party = "R" AND grade_current BETWEEN 9 AND 11;`

// let query = `SELECT count(*) AS TotalVotes, name
//              FROM votes
//              JOIN politicians
//              on politicians.id = votes.politicianId
//              WHERE name = 'Olympia Snowe';
// `

// let query = `SELECT name, COUNT(*)AS TotalVote FROM votes 
// JOIN politicians 
// on votes.politicianId = politicians.id
// WHERE name like 'adam%'
// GROUP BY politicians.id;`

// let query = `SELECT count(*) AS TotalVote, name,party,location FROM votes
//              JOIN politicians 
//              on politicians.id = votes.politicianId
//              GROUP BY name
//              ORDER BY TotalVote DESC
//              LIMIT 3;`

// let query = `SELECT first_name,last_name,gender,age FROM politicians
//              JOIN voters
//              on politicians.id = votes.politianId
//              JOIN votes
//              on voters.id = votes.voterId
//              WHERE name = 'Olympia Snowe';`

//! pollDB 2 

// let query = `SELECT name,location,grade_current, count(*) AS TotalVote FROM politicians
// JOIN votes
// on politicians.id = votes.politicianId
// GROUP BY name
// HAVING grade_current < 9 
// ORDER BY grade_current DESC;`

let query = `SELECT TotalVote, TopRank.name AS politicianName, first_name ||" "|| last_name AS VoterName, voters.gender FROM (SELECT COUNT (votes.id) AS TotalVote, politicians.name FROM votes
JOIN politicians
on politicians.id = votes.politicianId
GROUP BY politicians.id
ORDER BY TotalVote DESC
LIMIT 3) AS TopRank JOIN voters ;`

let query = `SELECT COUNT (*) AS TotalVote, first_name ||' ' || last_name AS Name , gender ,age FROM voters 
JOIN votes
on votes.voterId = voters.id
GROUP BY Name 
HAVING TotalVote > 1 
ORDER BY TotalVote DESC;`
db.serialize(() => {
  db.all(query, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.table(row);
    }
  })
})