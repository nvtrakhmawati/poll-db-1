const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const pathPoliticians = './politicians.csv'
const pathVoters = './voters.csv'
const pathVotes = './votes.csv'


let politiciansData = fs.readFileSync(pathPoliticians, 'utf8').split('\n')
let votersData = fs.readFileSync(pathVoters, 'utf8').split('\n')
let votesData = fs.readFileSync(pathVotes, 'utf8').split('\n')

let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  
db.serialize(
    function(err){
        if(err){
            return console.error(err.message);
        }
        else{
            for(let i = 1; i < politiciansData.length; i++){
                let row = politiciansData[i].split(',') // [0,1,2,3]
                db.run(`INSERT INTO politician(
                    name,
                    party,
                    location,
                    grade_current)

                    VALUES(
                    "${row[0]}", 
                    "${row[1]}",
                    "${row[2]}",
                    ${row[3]})
                    ;`, function(err){
                        if(err){
                            return console.error(err.message);
                        }
                        else{
                            console.log("added politicians data")
                        }
                    })
            }

            for(let i = 1; i < votersData.length; i++){
                let row = votersData[i].split(',') // [0,1,2,3]
                db.run(`INSERT INTO voter(
                    first_name,
                    last_name,
                    gender,
                    age)

                    VALUES(
                    "${row[0]}", 
                    "${row[1]}",
                    "${row[2]}",
                    ${row[3]})
                    ;`, function(err){
                        if(err){
                            return console.error(err.message);
                        }
                        else{
                            console.log("added voters data")
                        }
                    })
            }

            for(let i = 1; i < votesData.length; i++){
                let row = votesData[i].split(',') // [0,1]
                db.run(`INSERT INTO vote(
                    voterId,
                    candidateId)

                    VALUES(
                    ${row[0]}, 
                    ${row[1]})
                    ;`, function(err){
                        if(err){
                            return console.error(err.message);
                        }
                        else{
                            console.log("added votes data")
                        }
                    })
            }
        }
    }
)