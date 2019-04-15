var fs = require('fs')
var politician = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
var voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
var vote = fs.readFileSync('./votes.csv', 'utf8').split('\n')

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');
db.serialize(function(){

    var spltPolitician = []
    
    for(var i = 1; i < politician.length - 1; i++){
        spltPolitician.push(politician[i].split(',')) 
    }
    // console.log(spltPolitician)
    
    var query = ''
    // console.log(splt);
    
    for(var j = 0; j < spltPolitician.length; j++){
         query = `INSERT INTO politicians (name, party, location, grade_current)
                    VALUES ('${spltPolitician[j][0]}', '${spltPolitician[j][1]}', '${spltPolitician[j][2]}', '${spltPolitician[j][3]}')`
                    db.run(query, function(err) {
                        if(err){
                            console.log('error')
                        }else{
                            console.log('masuk pak politik')
                        }
                    })
    }
})

db.serialize(function(){

    var spltVoters = []
    
    for(var i = 1; i < voters.length - 1; i++){
        spltVoters.push(voters[i].split(',')) 
    }
    // console.log(spltVoters)
    
    var query2 = ''
    // console.log(splt);
    
    for(var j = 0; j < spltVoters.length; j++){
         query2 = `INSERT INTO voters (first_name, last_name, gender, age)
                    VALUES ('${spltVoters[j][0]}', '${spltVoters[j][1]}', '${spltVoters[j][2]}', '${spltVoters[j][3]}')`
                    db.run(query2, function(err) {
                        if(err){
                            console.log('error')
                        }else{
                            console.log('masuk pak voters')
                        }
                    })
    }
})

db.serialize(function(){

    var spltVotes = []
    
    for(var i = 1; i < vote.length - 1; i++){
        spltVotes.push(vote[i].split(',')) 
    }
    // console.log(spltVotes)
    
    var query = ''
    // console.log(splt);
    
    for(var j = 0; j < spltVotes.length; j++){
         query = `INSERT INTO votes (voter_id, politician_id)
                    VALUES ('${spltVotes[j][0]}', '${spltVotes[j][1]}')`
                    db.run(query, function(err) {
                        if(err){
                            console.log('error')
                        }else{
                            console.log('masuk pak votes')
                        }
                    })
    }
})

/* --------------------------------------------------------------------------- */

//update



