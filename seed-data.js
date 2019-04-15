const db = require('./connector.js')
const fs = require('fs')

let file_politician = fs.readFileSync('politicians.csv','utf8').split('\n')
db.serialize(function(){
    for(let i=1;i<file_politician.length;i++){
         let politician = file_politician[i].split(',')
         db.run(`INSERT INTO politicians(name,party,location,grade_current)
            VALUES("${politician[0]}","${politician[1]}","${politician[2]}",${politician[3]})`,function(err){
                if(err){
                    console.log('error');
                    
                }
            })
    }
})

let file_voters = fs.readFileSync('voters.csv','utf8').split('\n')
db.serialize(function(){
    for(let i=1;i<file_voters.length;i++){
        let voters = file_voters[i].split(',')
        db.run(`INSERT INTO voters(first_name,last_name,gender,age)
         VALUES("${voters[0]}","${voters[1]}","${voters[2]}",${voters[3]})`,function(err){
             if(err){
                console.log('error')
             }
        })
    }
})


let file_votes = fs.readFileSync('votes.csv','utf8').split('\n')
db.serialize(function(){
    for(let i=1;i<file_votes.length;i++){
        let votes = file_votes[i].split(',')
        db.run(`INSERT INTO votes(voterId,politicianId)
        VALUES(${votes[0]},${votes[1]})`,function(err){
            if(err){
                console.log('error votes')
            }
        })
    }    
})
