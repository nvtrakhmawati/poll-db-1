var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err)=>{
    if(!err){
        console.log('successfuly connects with database')
    }else{
        console.log(err)
    }
});

let fs = require('fs')
let politicians = fs.readFileSync('./Data/politicians.csv', 'utf8')
let voters = fs.readFileSync('./Data/voters.csv','utf8')
let votes = fs.readFileSync('./Data/votes.csv', 'utf8')

politicians = politicians.split('\n')
voters = voters.split('\n')
votes = votes.split('\n')
// console.log(politicians)
console.log(voters)
console.log(votes)

db.serialize(function(){
    let name = ''
    let party = ''
    let location =  ''
    let grade_current = ''
    for( let i = 1; i < politicians.length; i++){
        politicians[i] = politicians[i].split(',')
        // console.log(politicians[i])
        name = politicians[i][0]
        party = politicians[i][1]
        location = politicians[i][2]
        grade_current = politicians[i][3]
        db.run(`
        INSERT INTO Politicians(name, party, location, grade_current)
        VALUES ('${name}', '${party}', '${location}', ${grade_current})`
        )
    }

    let first_name = ''
    let last_name = ''
    let gender = ''
    let age = 0
    for( let i = 1; i < voters.length; i++){
        voters[i] = voters[i].split(',')
        first_name = voters[i][0]
        last_name = voters[i][1]
        gender = voters[i][2]
        age = voters[i][3]
        db.run(`
        INSERT INTO Voters(first_name, last_name, gender, age)
        VALUES ("${first_name}", "${last_name}", "${gender}", "${age}")`)
    }

    let voterId = 0
    let pliticianId = 0
    for( let i = 1; i < votes.length; i++){
        votes[i] = votes[i].split(',')
        voterId = votes[i][0]
        politicianId = votes[i][1]
        db.run(`
        INSERT INTO Votes (voterId, politicianId)
        VALUES ("${voterId}", "${politicianId}")`)
    }
})    

module.exports = db
