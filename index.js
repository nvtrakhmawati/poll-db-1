const db = require('./connector.js')

db.serialize(function(){
    db.all(`SELECT name, party, grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`,function(err,politician){
       if(err){
           console.log('error');
       }else{
           console.log(politician);
           
       } 
    })
})

db.serialize(function(){
    db.all(`SELECT count(*) AS totalVotes,politicians.name FROM votes JOIN politicians ON votes.politicianId = politicians.id WHERE politicians.name = "Olympia Snowe"`,function(err,total){
       if(err){
           console.log('error');
       }else{
           console.log(total);
       } 
    })
})

db.serialize(function(){
    db.all(`SELECT politicians.name, count(*) AS totalVotes FROM votes JOIN politicians ON votes.politicianId = politicians.id WHERE politicians.name LIKE 'Adam%' GROUP BY politicians.name`,function(err,adam){
       if(err){
           console.log('error');
       }else{
           console.log(adam);
       } 
    })
})

db.serialize(function(){
    db.all(`SELECT count(*) AS totalVotes, politicians.name,politicians.party,politicians.location FROM votes JOIN politicians ON votes.politicianId = politicians.id GROUP BY politicians.name ORDER BY totalVotes DESC LIMIT 3`,function(err,mostvotes){
       if(err){
           console.log('error');
       }else{
           console.log(mostvotes);
       } 
    })
})

db.serialize(function(){
    db.all(`SELECT first_name,last_name,gender,age FROM voters join votes on voters.id = votes.voterId join politicians on votes.politicianId = politicians.id where politicians.name = "Olympia Snowe"`,function(err,voter){
       if(err){
           console.log('error');
       }else{
           console.log(voter);
           
       } 
    })
})