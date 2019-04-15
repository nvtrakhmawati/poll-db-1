const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./databases.db')

function insertData(db_name, input){
    if (db_name == 'politican'){
        db.run(`INSERT INTO ${db_name} (name,party,location,grade_current) VALUES ("${input.join('\",\"')}")`)
    }else if (db_name == 'voters'){
        db.run(`INSERT INTO ${db_name} (first_name,last_name,gender,age) VALUES ("${input.join('\",\"')}")`)
    }
}
function updateData(inputId, db_name, row_name, newName){
    db.run(`UPDATE ${db_name} SET ${row_name} = "${newName}" WHERE ${db_name}.id == ${inputId}`)
}
function deleteData(inputId, db_name){
    db.run(`DELETE FROM ${db_name} WHERE ${db_name}.id == ${inputId}`)
}
function select1(){
    let query = `
    SELECT 
        name, party, grade_current 
    FROM 
        politican 
    WHERE 
        politican.party = "R" 
    AND 
        politican.grade_current BETWEEN 9.00 AND 11.00`
    db.all(query, function(err, row){
        if (err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}
function select2(){
    let query = `
    SELECT 
        COUNT(*) as totalVote,
        politican.name
    FROM 
        votes, politican 
    WHERE 
        politican.name = 'Olympia Snowe'
    AND
        politican.id = votes.politicianId;` 
    db.all(query, function(err, row){
        if (err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}
function select3(){
    let query = `
    SELECT 
        politican.name,
        COUNT(*) as totalVote
    FROM 
        votes, politican 
    WHERE
        politican.id = votes.politicianId
    AND
        politican.name LIKE 'Adam %'
    GROUP BY
        politican.name;` 
    db.all(query, function(err, row){
        if (err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}
function select4(){
    let query = `
    SELECT 
        COUNT(*) as totalVote,
        politican.name,
        politican.party,
        politican.location
    FROM 
        votes, politican 
    WHERE
        politican.id = votes.politicianId
    GROUP BY
        politican.name
    ORDER BY
        totalVote DESC
    LIMIT 3;` 
    db.all(query, function(err, row){
        if (err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}
function select5(){
    let query = `
    SELECT
        voters.first_name,
        voters.last_name,
        voters.gender,
        voters.age
    FROM 
        voters, votes, politican 
    WHERE
        voters.id = votes.voterId
    AND
        politican.name = 'Olympia Snowe'
    AND
        votes.politicianId = politican.id
    `
    db.all(query, function(err, row){
        if (err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}
// insertData("politican", ["rudy","R","JKT","99"])
// updateData(21, "politican", "name""thomas")
// deleteData(22, "politican")
// select1()
// select2()
// select3()
// select4()
// select5()