var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');

//insert new data in table politicians
function insert (nama, party, location, grade_current){
    let queryInsert = `INSERT INTO politicians (name, party, location, grade_current) 
                        VALUES ("${nama}", "${party}", "${location}", ${grade_current})`
    db.run(queryInsert, function (err) {
        if (err){
            console.log(err)
        }else{
            console.log('Successfully insert a new data politician')
        }
    });
}

//update table politicians
function update (colUpdate, updateValue, colCondition, conditionValue){
    let queryUpdate= `UPDATE politicians SET ${colUpdate}= "${updateValue}" 
                        WHERE ${colCondition}= "${conditionValue}"`
    db.run(queryUpdate, function (err) {
        if (err){
            console.log(err)
        }else{
            console.log('Successfully update data politician')
        }
    });
}

//Delete data from politicians
function Delete(conditionField, conditionValue){
    let queryDelete= `DELETE FROM politicians WHERE ${conditionField}= "${conditionValue}"`
    db.run(queryDelete, function (err) {
        if (err){
            console.log(err)
        }else{
            console.log('Successfully delete a data politician')
        }
    });
}

//View name, party and grade in politicians in party R and grade 9-11
function viewParty(party){
    let query=`SELECT * FROM politicians WHERE party = "${party}" and grade_current BETWEEN 9 and 12`
    db.all(query, function (err, data) {
        if (err){
            console.log(err)
        }else{
            console.log(data)
        }
    });
}

//Menampilkan  jumlah vote politician yang bernama 'Olympia Snowe'
function viewTotalVote(name){
    let query=`SELECT count(votes.politicianId) as totalVote, politicians.name
                FROM votes
                JOIN politicians
                ON politicians.politicianId = votes.politicianId
                WHERE politicians.name= "${name}"`
    db.all(query, function (err, data) {
        if (err){
            console.log(err)
        }else{
            console.log(data)
        }
    });
}

//Menampilkan jumlah vote nama tertentu
function viewTotalVoteIn(name){
    let query=`SELECT count(votes.politicianId) as totalVote, politicians.name
                FROM votes
                JOIN politicians
                ON politicians.politicianId = votes.politicianId
                WHERE politicians.name like '%${name}%'
                GROUP by politicians.name;`
    db.all(query, function (err, data) {
        if (err){
            console.log(err)
        }else{
            console.log(data)
        }
    });
}
 
//Top 3 votes
function topVotes(number){
    let query=`SELECT count(votes.politicianId) as totalVote, politicians.name, 
                politicians.party, politicians.location
                FROM votes
                JOIN politicians
                ON politicians.politicianId = votes.politicianId
                GROUP by politicians.name
                ORDER by totalVote DESC LIMIT ${number};`
    db.all(query, function (err, data) {
        if (err){
            console.log(err)
        }else{
            console.log(data)
        }
    });
}

//View Detail voters
function detailVoters(name){
    let query=`SELECT voters.first_name, voters.last_name, voters.gender, voters.age
                FROM voters
                JOIN politicians, votes
                ON politicians.politicianId = votes.politicianId and votes.voterId= voters.voterId
                WHERE politicians.name= "${name}"`
    db.all(query, function (err, data) {
        if (err){
            console.log(err)
        }else{
            console.log(data)
        }
    });
}


//insert('Ana', 'R', 'IL',12.76643585)
//update('name', 'Ana', 'name', 'Meilani' )
//Delete('name', 'Ana')

//viewParty('R')
//viewTotalVote('Olympia Snowe')
//viewTotalVoteIn('Adam')
//topVotes(5)
detailVoters('Erik Paulsen')

