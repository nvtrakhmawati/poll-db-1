const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.all(`SELECT name,party,grade_current FROM Politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`,(err,data)=>{
    if(err)console.log(err)
    else console.table(data)
})

db.all(`SELECT COUNT(*) AS totalVote,name  from Politicians
join Votes
ON id = Votes.politicianId
where name = "Olympia Snowe"
`,(err,data)=>{
    if(err)console.log(err)
    else console.table(data)
})

db.all(`SELECT name,count(*) AS totalVote from Politicians
JOIN Votes 
ON Politicians.id = Votes.politicianId
where name like  '%Adam%'
group by name`,(err,data)=>{
    if(err)console.log(err)
    else console.table(data)
})

db.all(`SELECT COUNT(*) AS totalVote,name,party,location FROM Politicians
JOIN Votes
ON Politicians.id = Votes.politicianId
group by name
order by totalVote desc
limit 3
`,(err,data)=>{
    if(err)console.log(err)
    else console.table(data)
})
db.all(`SELECT first_name,last_name,gender,age from Voters
join Votes 
ON Voters.id = Votes.voterId
join Politicians
ON Votes.politicianId = Politicians.id
WHERE Politicians.name = 'Olympia Snowe'`,(err,data)=>{
    if(err)console.log(err)
    else console.table(data)
})