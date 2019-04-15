const fs = require ('fs')
const db = require (`./setup.js`)



//-------------- POLITICIANS DATA
const readDataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')


let politiciansSplit = []
for (let i = 1; i < readDataPoliticians.length; i++){
    politiciansSplit.push( readDataPoliticians[i].split(','))
    
}


let insertQuery = `INSERT INTO politicians(
    name,
    party,
    location,
    grade_current) 
    VALUES `

for (let i = 0; i < politiciansSplit.length; i++){
    if ( i == politiciansSplit.length-1){
        insertQuery += `\n('${politiciansSplit[i][0]}','${politiciansSplit[i][1]}','${politiciansSplit[i][2]}',${politiciansSplit[i][3]})`    
    } else {

        insertQuery += `\n('${politiciansSplit[i][0]}','${politiciansSplit[i][1]}','${politiciansSplit[i][2]}',${politiciansSplit[i][3]}), `
    }
}

// console.log(insertQuery)

// db.run(insertQuery)





//-------------- VOTERS DATA

const readDataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n')


let votersSplit = []
for (let i = 1; i < readDataVoters.length; i++){
    votersSplit.push( readDataVoters[i].split(','))
    
}



let insertQuery2 = `INSERT INTO voters(
    first_name,
    last_name,
    gender,
    age) 
    VALUES `

for (let i = 0; i < votersSplit.length; i++){
    if ( i == votersSplit.length-1){
        insertQuery2 += `\n("${votersSplit[i][0]}","${votersSplit[i][1]}","${votersSplit[i][2]}",${votersSplit[i][3]})`    
    } else {
        insertQuery2 += `\n("${votersSplit[i][0]}","${votersSplit[i][1]}","${votersSplit[i][2]}",${votersSplit[i][3]}), `
    }
}

// console.log(insertQuery2)

// db.run(insertQuery2)






//-------------- VOTES DATA

const readDataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n')

let votesSplit = []
for (let i = 1; i < readDataVotes.length; i++){
    votesSplit.push(readDataVotes[i].split(','))
}

// console.log(votesSplit)

let insertQuery3 = `INSERT INTO votes(
    voterId,
    politicianId) 
    VALUES `

for (let i = 0; i < votesSplit.length; i++) {
    if ( i == votesSplit.length-1){
        insertQuery3 += `\n(${Number(votesSplit[i][0])},${Number(votesSplit[i][1])})` 

    } else {

        insertQuery3 += `\n(${Number(votesSplit[i][0])},${Number(votesSplit[i][1])}),`
    }
    
}

// db.run(insertQuery3)