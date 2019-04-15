const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

class Crud {

  static insert(tableName, valueArr) {
    if (tableName === 'Politicians') {
      let query = `INSERT INTO Politicians (name, party, location,grade_current)
VALUES ("${valueArr[0]}", "${valueArr[1]}", "${valueArr[2]}", ${valueArr[3]})`
      // console.log(query)
      db.run(query)
    } else if (tableName === 'Voters') {
      let query = `INSERT INTO Voters(first_name, last_name, gender, age)
VALUES ("${valueArr[0]}", "${valueArr[1]}", "${valueArr[2]}", ${valueArr[3]})`
      // console.log(query)
      db.run(query)
    }
  }

  static update (tableName, columnName, id, value) {
    let query = `UPDATE "${tableName}" SET "${columnName}" = "${value}" WHERE id = ${id}`
    // console.log(query)
    db.run(query)
  }

  static delete (tableName, id) {
    let query = `DELETE FROM "${tableName}" WHERE id = ${id}`
    // console.log(query)
    db.run(query)
  }

  static readOne (tableName, columnName, columnValue) {
    let query = `SELECT * FROM "${tableName}" WHERE "${columnName}" = "${columnValue}"`
    db.get(query, (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    }) 
  }
}

// RELEASE 2 CRUD

// Crud.insert('Politicians', ['Zaza','D','HI',12.76643582])
// Crud.update('Politicians', 'party', 21, 'RIDER')
// Crud.update('Politicians', 'party', 20, 'R')
// Crud.delete('Politicians', 21)
// Crud.readOne('Politicians', 'id', 20)

db.serialize((err) => {
  if (err) {
    console.log(err)
  } else {
    // RELEASE 3.1
      db.all(`
      SELECT
        name,
        party,
        grade_current
      FROM
        Politicians
      WHERE
        "party" = "R"
      AND
        "grade_current" BETWEEN 9 AND 11
        `, (err, data) => {
          if (err) {
            console.log(err)
          } else {
            console.log('1============' + '\n', data)
          }
        })

      // RELEASE 3.2
      db.all(`
      SELECT
        (SELECT	COUNT(*) AS "total_vote" FROM Votes WHERE Votes.politicianID = Politicians.id) as totalVote,
        name
      FROM
        Politicians
      WHERE
        name = "Olympia Snowe"`, (err, data) => {
        if (err) {
          console.log(err)
        } else {
          console.log('2============' + '\n', data)
        }
      })

      // RELEASE 3.3
      db.all(`
      SELECT
        name,
        (SELECT COUNT(*) from Votes WHERE Votes.politicianID = Politicians.id) as totalVote
      FROM
        Politicians
      WHERE
        name like "Adam%"`,(err, data)=> {
          if (err) {
            console.log(err)
          } else {
            console.log('3============' + '\n', data)
          }

      })

      // RELEASE 3.4
      db.all(`
      SELECT
        (SELECT COUNT (*) FROM Votes WHERE Votes.politicianID = Politicians.id) as totalVote,
        name,
        party,
        location
      FROM 
        Politicians
      ORDER BY
        totalVote DESC
      LIMIT 3`,(err, data)=> {
        if (err) {
          console.log(err)
        } else {
          console.log('4============' + '\n', data)
        }
      })

      // RELEASE 3.5
      db.all(`
      SELECT
        first_name,
        last_name,
        gender,
        age
      FROM
        Voters JOIN Votes
      WHERE
        Voters.id = Votes.voterId
      AND
        Votes.politicianID = (SELECT id FROM Politicians WHERE name = "Olympia Snowe")`,(err, data)=> {
          if (err) {
            console.log(err)
          } else {
            console.log('5============' + '\n', data)
          }
      })
  }
})