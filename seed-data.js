// const Politicians = require('./models/politicians.js')
// const Voters = require('./models/voters.js')
// const Votes = require('./models/votes.js')
// const fs = require('fs')
// const politiciansPath = './politicians.csv'
// const votersPath = './voters.csv'
// const votesPath = './votes.csv'

// fs.readFile(politiciansPath, 'utf8', (err, data) => {
//     if(err) console.log(err)
//     else{
//         let dataArr = data.split('\n').slice(1)
//         for(let x=0; x<dataArr.length; x++){
//             let personData = dataArr[x].split(',')
//             let personObj = {
//                 name: personData[0],
//                 party: personData[1],
//                 location: personData[2],
//                 grade_current: personData[3]
//             }
//             let person = new Politicians(personObj)
//             Politicians.create(person, (err, data) => {
//                 if(err) console.log(err)
//             })
//         }
//         console.log('successfully imported politicians data')
//     }
// })

// fs.readFile(votersPath, 'utf8', (err, data) => {
//     if(err) console.log(err)
//     else{
//         let dataArr = data.split('\n').slice(1)
//         for(let x=0; x<dataArr.length; x++){
//             let personData = dataArr[x].split(',')
//             let personObj = {
//                 firstName: personData[0],
//                 lastName: personData[1],
//                 gender: personData[2],
//                 age: personData[3]
//             }
//             let person = new Voters(personObj)
//             Voters.create(person, (err, data) => {
//                 if(err) console.log(err)
//             })
//         }
//         console.log('successfully imported voters data')
//     }
// })

// fs.readFile(votesPath, 'utf8', (err, data) => {
//     if(err) console.log(err)
//     else{
//         let dataArr = data.split('\n').slice(1)
//         for(let x=0; x<dataArr.length; x++){
//             let personData = dataArr[x].split(',')
//             let personObj = {
//                 voterId: personData[0],
//                 politicianId: personData[1]
//             }
//             let person = new Votes(personObj)
//             Votes.create(person, (err, data) => {
//                 if(err) console.log(err)
//             })
//         }
//         console.log('successfully imported votes data')
//     }
// })