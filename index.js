const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  // console.log('Connected to the database.');
})

function addData() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Data added')
	db.run(`
		INSERT INTO Politicians (name, party, location, grade_current)
		VALUES ('Elia Victor', 'MM', 'OKL', 14)
		
	`)
	}
})
}

function updateData() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Data updated')
	db.run(`
		UPDATE Politicians
		SET grade_current = 17
		WHERE grade_current = 14
		
	`)
	}
})
}

function deleteData() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
		console.log('Data deleted')
	db.run(`
		DELETE FROM Politicians
		WHERE grade_current = 17
		
	`)
	}
})
}

// addData()
// updateData()
// deleteData()

//Release 3
function showPartyR() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	let query = `
	SELECT * FROM Politicians 
	WHERE grade_current >= 9 
	AND grade_current <= 11`
	db.all(query, function(err, data){
		console.log(data)
	})
	}
})
}

function totalVoteOlympia() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	let query = `
	SELECT COUNT(idVoter) 
	FROM Votes WHERE idPolitician IN 
	(SELECT idPoliticians FROM Politicians 
	WHERE name = "Olympia Snowe")`
	db.all(query, function(err, data){
		console.log(data)
	})
	}
})
}

function totalVoteAdam() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	let query = `
	SELECT Politicians.name, count(Votes.idVoter) FROM Votes, Politicians 
	WHERE Votes.idPolitician = Politicians.idPoliticians AND Politicians.name like 'Adam %'
	GROUP BY idPolitician;
	`
	db.all(query, function(err, data){
		console.log(data)
	})
	}
})
}

function maxVoteLoc() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	let query = `
	SELECT Politicians.name, Politicians.party, Politicians.location, count(Votes.idVoter) as totalVote
	FROM Votes, Politicians
	WHERE Votes.idPolitician = Politicians.idPoliticians
	GROUP BY Politicians.name
	ORDER BY totalVote DESC
	LIMIT 3;
	`
	db.all(query, function(err, data){
		console.log(data)
	})
	}
})
}

function whoVoteOlympia() {
	db.serialize((err) => {
	if (err) {
		console.log(err)
	} else {
	let query = `SELECT first_name, last_name, gender, age 
	FROM Voters LEFT JOIN Votes ON Voters.idVoters = Votes.idVotes 
	LEFT JOIN Politicians ON Votes.idPolitician = Politicians.idPoliticians 
	WHERE name = "Olympia Snowe"
	`
	db.all(query, function(err, data){
		console.log(data)
	})
	}
})
}

// showPartyR()
// totalVoteOlympia()
// totalVoteAdam()
// maxVoteLoc()
whoVoteOlympia()

