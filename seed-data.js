var fs = require ('fs')

let politicians = './politicians.csv'
let voters = './voters.csv'
let votes = './votes.csv'

// const sqlite3  = require('sqlite3').verbose();
const sqlite3 = require('./sqlite-crud/sqlite3').verbose();
const db       = new sqlite3.Database('./sqlite-crud/polldb1.db')//, (err) => {
// 	if(err){
// 		return console.log(error.message)
// 	}else{
// 		console.log('ok')
// 	}
// })

	class seedData{
		constructor(){

		}

	static readList(list){
		var listData = (fs.readFileSync(list, 'utf8')).split('\r\n').slice(1)
		// console.log(listData)
		var dataPoliticians = []
		for(let i = 0; i < listData.length; i++){
		let temp = listData[i].split(',')
		dataPoliticians.push(temp)
		}
		return dataPoliticians
		// var temp
		// return listData
	}
}

	let candidatesData = seedData.readList(politicians)
	db.serialize((err) => {
  		if (err) {
    console.log(err)
  		} else {
		for(let i = 0; i < candidatesData.length; i++){
			let query = `INSERT INTO Candidates (name, party, location, grade_current) VALUES 
			("${candidatesData[i][0]}", "${candidatesData[i][1]}", "${candidatesData[i][2]}", ${candidatesData[i][3]})`
			db.run(query, (err) => {
				if(err) {
          			console.log(err)
        		}else{
          			console.log(`data berhasil diinput ke politicians table`)
          		}
      		})
    	}
  	}
})
	// 		db.run(`INSERT INTO Candidates (politicianId, name, partai, location, grade_current)
	//                VALUES ("${listData[i].politicianId}", "${listData[i].name}, "${listData[i].partai}, "${listData[i].location}, "${listData[i].grade_current}")`, (err) =>{
	// 		if(err){
	// 			console.log(error.message)
	// 		}else{
	// 			console.log('data berhasil diinput')
	// 		}
	// 	}
	// }
	let votersData = seedData.readList(voters)
	db.serialize((err) => {
		if (err) {
	  	console.log(err)
	  	}else{
	    for (let i = 0; i < votersData.length; i++) {
	    	let query = `INSERT INTO Voters(first_name, last_name, gender, age) VALUES
	    	("${votersData[i][0]}", "${votersData[i][1]}", "${votersData[i][2]}", ${votersData[i][3]})`
	    	db.run(query, (err) => {
	        	if(err) {
	        		console.log(err)
	        	}else{
	        		console.log(`data berhasil diinput ke voters table`)
	        	}
	    	})
	  	}
	}
})


	let votesData = seedData.readList(votes)
	db.serialize((err) => {
		if (err) {
	    	console.log(err)
		}else{
	    for (let i = 0; i < votesData.length; i++) {
	    	let query = `INSERT INTO Votes(voterId, politicianId) VALUES
	    	(${votesData[i][0]}, ${votesData[i][1]})`
	    	db.run(query, (err) => {
	    		if(err) {
	          		console.log(err)
	        	}else{
	        		console.log(`data berhasil diinput ke votes table`)
	        	}
	    	})
	  	}
	}
})
