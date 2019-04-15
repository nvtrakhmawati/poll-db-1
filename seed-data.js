const fs = require('fs')
const filePolitician = './politicians.csv'
const fileVoters = './voters.csv'
const fileVotes = './votes.csv'
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the database.');
})


class SeedData {
	static readData(file) {
		let readData = fs.readFileSync(file, 'utf8').split('\n').slice(1)
		let newData = []
		for (var i = 0; i < readData.length; i++) {
			let splittedData = readData[i].split(',')
			newData.push(splittedData)
		}
		return newData
	}
}

let politicianData = SeedData.readData(filePolitician)
for (var i = 0; i < politicianData.length; i++) {
	db.run(`INSERT INTO Politicians (name, party, location, grade_current)
		VALUES ('${politicianData[i][0]}', '${politicianData[i][1]}', '${politicianData[i][2]}', '${politicianData[i][3]}')`, (err) => {
			if (err) {
      				console.log(err.message);
   				} else {
   					console.log('sukses input database')
   				}
			}
	)
}

let votersData = SeedData.readData(fileVoters)
for (var i = 0; i < votersData.length; i++) {
	db.run(`INSERT INTO Voters (first_name, last_name, gender, age)
		VALUES ("${votersData[i][0]}", "${votersData[i][1]}", "${votersData[i][2]}", "${votersData[i][3]}")`, (err) => {
			if (err) {
      				console.log(err.message);
   				} else {
   					console.log('sukses input database')
   				}
			}
	)
}

let voteData = SeedData.readData(fileVotes)
for (var i = 0; i < voteData.length; i++) {
	db.run(`INSERT INTO Votes (idVoter, idPolitician)
		VALUES ("${voteData[i][0]}", "${voteData[i][1]}")`, (err) => {
			if (err) {
      				console.log(err.message);
   				} else {
   					console.log('sukses input database')
   				}
			}
	)
}