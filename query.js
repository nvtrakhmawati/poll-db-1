var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

db.all(`SELECT politicians.name,politicians.party,politicians.grade_current 
FROM politicians WHERE politicians.party = 'R' AND grade_current BETWEEN 9 AND 11`,(err,datas) => {
    if(err) console.log(err)
    else{
        console.log(datas)
    }
})

db.all(`SELECT COUNT(*) AS totalVote, politicians.name FROM politicians JOIN votes ON politicians.id = votes.politicianId 
WHERE politicians.name = 'Olympia Snowe'`,(err,datas) => {
    if(err) console.log(err)
    else{
        console.log(datas)
    }
})

db.all(`SELECT politicians.name, COUNT(*) AS totalVote FROM politicians JOIN votes ON politicians.id = votes.politicianId 
WHERE politicians.name LIKE '%adam%' GROUP BY politicians.name`,(err,datas) => {
    if(err) console.log(err)
    else{
        console.log(datas)
    }
})

db.all(`SELECT politicians.name , COUNT(*) as totalVote FROM politicians JOIN votes ON politicians.id = votes.politicianId
GROUP BY politicians.id ORDER BY totalVote DESC LIMIT 3`,(err,datas) => {
    if(err) console.log(err)
    else{
        console.log(datas)
    }
})

db.all(`SELECT voters.first_name,voters.last_name,voters.gender,voters.age 
FROM politicians JOIN votes ON politicians.id = votes.politicianId JOIN voters ON voters.id = votes.voterId
WHERE politicians.name = 'Olympia Snowe'`,(err,datas) => {
    if(err) console.log(err)
    else{
        console.log(datas)
    }
})