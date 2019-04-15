const fs = require('fs')
const politicians = './politicians.csv'
const voters = './voters.csv'
const votes = './votes.csv'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

class Seed {
  constructor() {

  }

  static readAll (input) {
    let data = fs.readFileSync(input, 'utf8').split('\n').slice(1)
    let newData = []
    for (let i = 0; i < data.length; i++) {
      let splitData = data[i].split(',')
      newData.push(splitData)
    }
    return newData
  }

}

let politiciansData = Seed.readAll(politicians)
db.serialize((err) => {
  if (err) {
    console.log(err)
  } else {
    for (let i = 0; i < politiciansData.length; i++) {
      let query = `INSERT INTO Politicians (name, party, location,grade_current)
VALUES ("${politiciansData[i][0]}", "${politiciansData[i][1]}", "${politiciansData[i][2]}", ${politiciansData[i][3]})`
      // console.log(query)
      db.run(query, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log(`Success adding new data to Politician Table`)
        }
      })
    }
  }
})

let votersData = Seed.readAll(voters)
db.serialize((err) => {
  if (err) {
    console.log(err)
  } else {
    for (let i = 0; i < votersData.length; i++) {
      let query = `INSERT INTO Voters(first_name, last_name, gender, age)
VALUES ("${votersData[i][0]}", "${votersData[i][1]}", "${votersData[i][2]}", ${votersData[i][3]})`
      // console.log(query)  
      db.run(query, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log(`Success adding new data to Voters Table`)
        }
      })
    }
  }
})


let votesData = Seed.readAll(votes)
db.serialize((err) => {
  if (err) {
    console.log(err)
  } else {
    for (let i = 0; i < votesData.length; i++) {
      let query = `INSERT INTO Votes(voterId, politicianId)
VALUES (${votesData[i][0]}, ${votesData[i][1]})`
      // console.log(query)  
      db.run(query, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log(`Success adding new data to Votes Table`)
        }
      })
    }
  }
})
