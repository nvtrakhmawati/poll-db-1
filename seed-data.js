const fs = require('fs')
const db = require('sqlite3').verbose();
const database = new db.Database("./database.db");
const Politicians = fs.readFileSync("./politicians.csv", "utf8").split("\n")
const Voters = fs.readFileSync("./voters.csv", "utf8").split("\n")
const Votes = fs.readFileSync("./votes.csv", "utf8").split("\n")




// database.serialize(function(){
//     for (let i = 1; i < Votes.length; i++) {
//         const SplittedVotes = Votes[i].split(",")
//         database.run(`INSERT INTO votes ("voters_id", "politician_id") VALUES(${SplittedVotes[0]},${SplittedVotes[1]})`, function(err){
//             if(err){
//                 console.log(err)
//             }
//         })
        
//     }
// })


// database.serialize(function(){
//     for (let i = 1; i < Voters.length; i++) {
//         const SplittedVoters = Voters[i].split(",")
//         // console.log(SplittedVoters[3])
        
//         database.run(`INSERT INTO voters ("first_name", "last_name", "gender", "age") VALUES ("${SplittedVoters[0]}","${SplittedVoters[1]}","${SplittedVoters[2]}","${SplittedVoters[3]}")`, function(err){
//             if(err){
//                 console.log(err)
//             }
//         })
        
//     }
// })
    


// database.serialize(function() {
//     for (let i = 1; i < Politicians.length; i++) {
//         const SplittedPoliticians = Politicians[i].split(",")
//         database.run(`INSERT INTO politicians ("name", "party", "location", "grade_current") VALUES("${SplittedPoliticians[0]}","${SplittedPoliticians[1]}","${SplittedPoliticians[2]}","${SplittedPoliticians[3]}")`, function(err){
//             if(err){
//                 console.log(err)
//             }
//         })
        
//     }
// })





