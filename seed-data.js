const fs = require("fs")
const sqlite3 = require("sqlite3").verbose()
// const db = require("./db.js")
const database = new sqlite3.Database("./poll.db")
const pathPolitician = "./politicians.csv"
const pathVoters = "./voters.csv"
const pathVotes = "./votes.csv"
let input = process.argv.slice(2)
let cmd = input[0]
let newInput = input.slice(1)



class Database{
    static politician(){
        let data = fs.readFileSync(pathPolitician, 'utf8')
        data = data.split("\n")
        let arr = []
        for (let i = 1; i < data.length-1; i++){
            data[i] = data[i].split(",")
            arr.push(data[i])
        }
        database.serialize(function() {
        for (let i = 0; i < arr.length; i++){
            let query = `INSERT INTO politicians(name, party, location, grade_current) VALUES ("${arr[i][0]}", "${arr[i][1]}", "${arr[i][2]}", "${arr[i][3]}")`
            database.run(query)
        }
    })
    }

    static voters(){
        let data = fs.readFileSync(pathVoters, 'utf8')
        data = data.split("\n")
        let arr = []
        for (let i = 1; i < data.length-1; i++){
            data[i] = data[i].split(",")
            arr.push(data[i])
        }
        database.serialize(function() {
        for (let i = 0; i < arr.length; i++){
            let query = `INSERT INTO voter(first_name, last_name, gender, age) VALUES ("${arr[i][0]}", "${arr[i][1]}", "${arr[i][2]}", "${arr[i][3]}")`
            database.run(query)
        }
    })
    }

    static votes(){
        let data = fs.readFileSync(pathVotes, 'utf8')
        data = data.split("\n")
        let arr = []
        for (let i = 1; i < data.length-1; i++){
            data[i] = data[i].split(",")
            arr.push(data[i])
        }
        database.serialize(function() {
        for (let i = 0; i < arr.length; i++){
            let query = `INSERT INTO votes(voterID, candidateID) VALUES ("${arr[i][0]}", "${arr[i][1]}")`
            database.run(query)
        }
    })
    }
    static createPolitician(arr){
        database.serialize(function() {
            let query = `INSERT INTO politicians(name, party, location, grade_current) VALUES ("${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}")`
            database.run(query)
    })
    }
    static createVoters(arr){
        database.serialize(function() {
            let query = `INSERT INTO voter(first_name, last_name, gender, age) VALUES ("${arr[0]}", "${arr[1]}", "${arr[2]}", "${arr[3]}")`
            database.run(query)
    })
    }
    static createVotes(arr){

        database.serialize(function() {
            let query = `INSERT INTO votes(voterID, candidateID) VALUES ("${arr[0]}", "${arr[1]}")`
            database.run(query)
    })
    }
    static updatePolitician(arr){
        console.log(arr)
        let name = ''
        for (let i = 0; i < arr[0].length; i++){
            if (arr[0][i] == '_'){
                name+= ' '
            } else {
                name+= arr[0][i]
            }
        }

        database.serialize(function() {
            let query = `UPDATE politicians SET name = "${name}", party = "${arr[1]}", location = "${arr[2]}", grade_current = "${arr[3]}" WHERE candidateID = ${asd}`
            database.run(query)
    })
    }
    static deletePolitician(arr){

        database.serialize(function() {
            let query = `DELETE FROM politicians WHERE name = "${arr[0]}"`
            database.run(query)
            
    })
    }
    static selectR(){
        database.serialize(function() {
            let query = `SELECT * FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`
            database.all(query, function(err, tables) {
                console.log(tables);})
    })
    
    }
    static selectO(){
        database.serialize(function() {
            let query = `SELECT
                            COUNT(votes.candidateID) AS totalVote,
                            politicians.name
                            
                        FROM
                            politicians
                        INNER JOIN votes ON politicians.candidateID = votes.candidateID
                        WHERE politicians.name = 'Olympia Snowe'`
            database.all(query, function(err, tables) {
                console.log(tables);})
    })
    }
    static word(){
        database.serialize(function() {
            let query = `SELECT * FROM politicians WHERE name LIKE 'adam%'`
            database.all(query, function(err, tables) {
                console.log(tables);})
    })
    }
    static three(){
        database.serialize(function() {
            let query = `SELECT
                            COUNT(votes.candidateID) AS totalVote,
                            politicians.name,
                            politicians.party,
                            politicians.location   
                        FROM
                            politicians
                        INNER JOIN votes ON politicians.candidateID = votes.candidateID
                        GROUP BY politicians.name
                        ORDER BY totalVote DESC
                        LIMIT 3`
            database.all(query, function(err, tables) {
                console.log(tables);})
    })
    }
    static voteO(){
        database.serialize(function() {
            let query = `SELECT
                            voter.first_name,
                            voter.last_name,
                            voter.gender,
                            voter.age   
                        FROM
                            voter
                        WHERE voter.voterID 
                        IN (SELECT voter.voterID FROM voter JOIN votes ON voter.voterID = votes.voterID WHERE votes.candidateID = 
                        (SELECT politicians.candidateID FROM politicians WHERE politicians.name = 'Olympia Snowe'))`
            database.all(query, function(err, tables) {
                console.log(tables);})
    })
    }
}

if (cmd == 'createPolitician'){
    Database.createPolitician(newInput)
} else if (cmd == 'createVoters'){
    Database.createVoters(newInput)
} else if(cmd == 'createVote'){
    Database.createVotes(newInput)
} else if(cmd == 'updatePolitician'){
    Database.updatePolitician(newInput)
} else if(cmd == 'deletePolitician'){
    Database.deletePolitician(newInput)
} else {
    Database.selectR()
    Database.selectO()
    Database.word()
    Database.three()
    Database.voteO()

}
