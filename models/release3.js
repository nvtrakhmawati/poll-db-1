class Realese {
    static case1(cb){
        db.all(`SELECT name, party, grade_current FROM Politicians WHERE party= 'R' AND grade_current BETWEEN 9 AND 11;`, function(err, getRandRange){
            if(err) cb(err)
            else cb(getRandRange) 
        })
    }
    
    static case2(){
        db.all(`SELECT count(votes.id_Politicians) AS 'totalVote', Politicians.name FROM Votes JOIN Politicians ON Votes.id_Politicians = Politicians.id WHERE Politicians.name='Olympia Snowe'`, function(err, getSnow){
            if(err) cb(err)
            else cb(getSnow) 
        })
    }
    
    static case3(){
        db.all(`SELECT Politicians.name, count(Votes.id_Politicians) AS 'totalVote' FROM Votes JOIN Politicians ON Votes.id_Politicians = Politicians.id WHERE Politicians.name LIKE 'adam %'  GROUP BY Politicians.name`, function(err, getAdam){
            if(err) cb(err)
            else cb(getAdam) 
    
        })
    }
    
    static case4(){
        db.all(`SELECT count(Votes.id_Politicians) AS 'totalVote', Politicians.name, Politicians.party, Politicians.location FROM Votes JOIN Politicians ON Votes.id_Politicians = Politicians.id GROUP BY Politicians.name  ORDER BY count(Votes.id_Politicians) DESC LIMIT 3`, function(err, get3Polticians){
            if(err) cb(err)
            else cb(get3Polticians) 
        })
    }
    
    static case5(){
        db.all(`SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age FROM Voters JOIN Votes ON Voters.id = Votes.id_Voters WHERE Votes.id_Politicians = 17`, function(err, getVoteSnow){
            if(err) cb(err)
            else cb(getVoteSnow) 
        })
    }
}