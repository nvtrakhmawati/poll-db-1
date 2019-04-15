const fs  = require('fs')
const sqlite3  = require('sqlite3')
const db = new sqlite3.Database('database.db')

fs.readFile('./politicians.csv','utf8',(err,data)=>{
    if(err)console.log(err)
    else {
        data  = data.trim().split('\n')
        let [politicains_head,...politicians_data] = data;
        politicains_head = politicains_head.split(',')
        console.log(politicains_head)
        
        db.serialize(function(){
           
 
            let stmt = db.prepare("INSERT INTO Politicians (name, party,location, grad_ecurrent) VALUES (?,?,?,?)");
            politicians_data.forEach(po=>stmt.run( po.split(',') ))
            
            stmt.finalize();
        })
    }
    fs.readFile('./voters.csv','utf8',(err,data)=>{
        if(err) console.log(err)
        else {
            data  = data.trim().split('\n')
            let [voters_head,...voters_data] = data;
            voters_head = voters_head.split(',')
            console.log(voters_head)
            
            db.serialize(function(){
           
     
                let stmt = db.prepare("INSERT INTO Voters (first_name, last_name,gender, age) VALUES (?,?,?,?)");
                voters_data.forEach(po=>stmt.run( po.split(',') ))
                
                stmt.finalize();
            })
        }
        fs.readFile('./votes.csv','utf8',(err,data)=>{
            if(err) console.log(err)
            else {
                data  = data.trim().split('\n')
                let [votes_head,...votes_data] = data;
                votes_head = votes_head.split(',')
                console.log(votes_head)
                
                db.serialize(function(){
        
         
                    let stmt = db.prepare("INSERT INTO Votes (voterId,politicianId) VALUES (?,?)");
                    votes_data.forEach(po=>stmt.run( po.split(',') ))
                    
                    stmt.finalize();
                })
            }
    })
})})