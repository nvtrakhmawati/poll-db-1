var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv','utf8').split('\n').slice(1)
const voters = fs.readFileSync('./voters.csv','utf8').split('\n').slice(1) 
const votes = fs.readFileSync('./votes.csv','utf8').split('\n').slice(1)


const dataVotes = []
for(let i = 0; i < votes.length; i++){
    dataVotes.push(votes[i].split(','))
}

db.serialize(() => {
    for(let i = 0; i < dataVotes.length-1; i++){
        let sql = `INSERT INTO votes (id_voters, politicians_id) 
        VALUES ("${dataVotes[i][0]}","${dataVotes[i][1]}")`
        db.run(sql,function(err){
            if(err){
                console.log(err)
            }else{
                console.log('data berhasil ditambah')
            }
        })
    }
})

const dataPoliticians = []
for(let i = 0; i < politicians.length; i++){
    dataPoliticians.push(politicians[i].split(','))
}

db.serialize(() => {
    for(let i = 0; i < dataPoliticians.length-1; i++){
        let sql = `INSERT INTO politicians (name, party, location, grade_current) 
        VALUES ('${dataPoliticians[i][0]}','${dataPoliticians[i][1]}', '${dataPoliticians[i][2]}', '${dataPoliticians[i][3]}')`
        db.run(sql,function(err){
            if(err){
                console.log(err)
            }else{
                console.log('data berhasil ditambah')
            }
        })
    }
})
 
const dataVoters = []
for(let i = 0; i < voters.length; i++){
    dataVoters.push(voters[i].split(','))
}

db.serialize(() => {
    for(let i = 0; i < dataVoters.length-1; i++){
        let sql = `INSERT INTO voters (first_name, last_name, gender, age) 
        VALUES ("${dataVoters[i][0]}","${dataVoters[i][1]}", "${dataVoters[i][2]}", "${dataVoters[i][3]}")`
        db.run(sql,function(err){
            if(err){
                console.log(err)
            }else{
                console.log('data berhasil ditambah')
            }
        })
    }
})

db.close();
