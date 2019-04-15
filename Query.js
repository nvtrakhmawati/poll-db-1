const db = require("./db")

function viewPartyGrade(input){
  db.all(`SELECT name,party,grade_current FROM politicians WHERE party = ? AND grade_current >= ? AND grade_current <= ?`,input,function(err,rows){
    if(err) console.log(err); 
    else{
      console.log("--------------- 1 -----------------")
      console.log(rows)
    }
  })
}

function viewCountVote(name){
  db.all(`SELECT
  COUNT(votes.politicianID) as totalVote, politicians.name
  FROM votes
  JOIN politicians
  ON votes.politicianID = politicians.id
  WHERE politicians.name = ?`,name,function(err,rows){
    if(err) console.log(err); 
    else{
      console.log("--------------- 2 -----------------")
      console.log(rows)
    }
  })
}

function viewCountVoteName(name){
  db.all(`SELECT
  politicians.name, COUNT(votes.politicianID) as totalVote
  FROM votes, politicians
  WHERE politicians.id = votes.politicianID AND politicians.name LIKE ?
  GROUP BY politicians.name`,name + "%",function(err,rows){
    if(err) console.log(err); 
    else{
      console.log("--------------- 3 -----------------")
      console.log(rows)
    }
  })
}

function viewBiggestCount(){
  db.all(`select count(votes.id) as totalVote, politicians.name, politicians.party, politicians.location
  from votes, politicians
  where votes.politicianId = politicians.id
  group by politicians.name
  order by totalVote desc
  limit 3`,function(err,rows){
    if(err) console.log(err); 
    else{
      console.log("--------------- 4 -----------------")
      console.log(rows)
    }
  })
}

function viewCountName(name){
  db.all(`select voters.first_name, voters.last_name, voters.gender, voters.age
  from voters, votes, politicians
  where votes.voterId = voters.id and votes.politicianId = politicians.id and politicians.name = ?`,name,function(err,rows){
    if(err) console.log(err); 
    else{
      console.log("--------------- 5 -----------------")
      console.log(rows)
    }
  })
}

viewPartyGrade(["R",9,11])
viewCountVote("Olympia Snowe")
viewCountVoteName("Adam")
viewBiggestCount()
viewCountName("Olympia Snowe")