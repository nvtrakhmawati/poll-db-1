const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

let query1 = `
SELECT
politician.name,
politician.grade_current
FROM politician
WHERE
party = 'R'
AND
politician.grade_current BETWEEN 9.00 AND 11.00;`

let query2 = `
select
count(vote.id) as totalVote,
politician.name
from vote, politician
where politician.name = 'Olympia Snowe'
and politician.id = vote.candidateId;`

let query3 =`
select
count(vote.id) as totalVote,
politician.name
from
vote,
politician
where
vote.candidateId = politician.id
AND
politician.name LIKE 'Adam %'
group by politician.name;`

let query4 = `
select
count(vote.id) as totalVote,
politician.name,
politician.party,
politician.location
from
vote,
politician
where
vote.candidateId = politician.id
group by politician.name
order by totalVote desc
limit 3;`

let query5 =`
select
voter.first_name,
voter.last_name,
voter.gender,
voter.age
from
voter,
vote,
politician
where
vote.voterId = voter.id and
vote.candidateId = politician.id and
politician.name = 'Olympia Snowe';`

db.serialize(function(err){
    if(err){
        return console.error(err.message);
    }
    else{
        db.all(query1, function(err,row){
            if(err){
                throw err;
            }
            else{
                console.log("SOAL 1")
                console.log(row)
            }
        });
        db.all(query2, function(err,row){
            if(err){
                throw err;
            }
            else{
                console.log("\nSOAL 2")
                console.log(row)
            }
        });
        db.all(query3, function(err,row){
            if(err){
                throw err;
            }
            else{
                console.log("\nSOAL 3")
                console.log(row)
            }
        });
        db.all(query4, function(err,row){
            if(err){
                throw err;
            }
            else{
                console.log("\nSOAL 4")
                console.log(row)
            }
        });
        db.all(query5, function(err,row){
            if(err){
                throw err;
            }
            else{
                console.log("\nSOAL 5")
                console.log(row)
            }
        });
    }
})