var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('poll.db');
const fs= require('fs')

function readData(file){
    let allData= []
    let data= fs.readFileSync(file, 'utf8').split('\n').slice(1)
    for (let i=0; i<data.length; i++){
        allData.push(data[i].split(','))
    }
    return allData
}

// //Insert data politicians
let dataPoliticians= readData('./politicians.csv')
for(let i=0; i<dataPoliticians.length; i++){
let insertPolitician= `INSERT INTO politicians (name, party, location, grade_current) 
                        VALUES ("${dataPoliticians[i][0]}", "${dataPoliticians[i][1]}",
                         "${dataPoliticians[i][2]}", ${dataPoliticians[i][3]})`
    db.run(insertPolitician, function (err) {
                if (err){
                    console.log(err)
                }else if(i== dataPoliticians.length-1){
                    console.log('Successfully insert a data politicians')
                }
              });
}


// //Insert data voters
let dataVoter= readData('./voters.csv')
for(let i=0; i<dataVoter.length; i++){
    let inserVoter= `INSERT INTO voters (first_name, last_name, gender, age) 
                VALUES ("${dataVoter[i][0]}", "${dataVoter[i][1]}", "${dataVoter[i][2]}", ${dataVoter[i][3]})`
    db.run(inserVoter, function(err){
        if(err){
            console.log(err)
        }else if(i== dataVoter.length-1){
            console.log('Successfully insert a data voters')
        }
    })
}

// //Insert data vote
let dataVote= readData('./votes.csv')
for(let i=0; i<dataVote.length; i++){
    let insertVotes= `INSERT INTO votes (voterId, politicianId) 
    VALUES (${dataVote[i][0]}, ${dataVote[i][1]})`
    db.run(insertVotes, function(err){
        if(err){
            console.log(err)
        }else if(i== dataVote.length-1){
            console.log('Successfully insert a data votes')
        }
    })
}