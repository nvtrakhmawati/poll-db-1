const fs = require('fs')
const db = require('./setup')
const politicianData = './politicians.csv'
const votersData = './voters.csv'
const votesData = './votes.csv'

class Seeds{
    constructor(){
    }
    static readData(input){
        let data = fs.readFileSync(input,'utf8').split('\n')
        let dataSplitted = []
        for( let i = 1 ; i < data.length ; i++){
            dataSplitted.push(data[i].split(',')) 
        }
        // console.log(dataSplitted)
        return dataSplitted
    }

    static insertDataPolitician(input){
        let data = this.readData(input)
        const query = `INSERT INTO politicians(name, party, location, currentGrade)
                    VALUES`;
        db.serialize(function(){
            // console.log(data)
            for(let i = 0 ; i < data.length ; i++){
                db.run(query + `("${data[i][0]}","${data[i][1]}","${data[i][2]}",${data[i][3]})`,function(err){
                    if(err) throw err;
                    console.log('Succesfully created a new row!'); 
                })
            }
        })
    }

    static insertDataVoter(input){
        let data = this.readData(input)
        const query = `INSERT INTO voters(firstName, lastName, gender, age)
                    VALUES`;
        db.serialize(function(){
            for(let i = 0 ; i < data.length ; i++){
                db.run(query + `("${data[i][0]}","${data[i][1]}","${data[i][2]}",${data[i][3]})`,function(err){
                    if(err) throw err;
                    console.log('Succesfully created a new row!'); 
                })
            }
        })
    }

    static insertVotes(input){
        let data = this.readData(input)
        const query = `INSERT INTO votes(voterId, politicianId)
                    VALUES`;
        db.serialize(function(){
            for(let i = 0 ; i < data.length ; i++){
                db.run(query + `(${data[i][0]},${data[i][1]})`,function(err){
                    if(err) throw err;
                    console.log('Succesfully created a new row!'); 
                })
            }
        })
    }
}

// var politicianData = fs.readFileSync('politicians.csv','utf8')
//   .toString()
//   .split("\n")

// console.log(personData)

// Seeds.readData(politicianData)
// Seeds.readData(votersData)
// Seeds.readData(votesData)
Seeds.insertDataPolitician(politicianData)
Seeds.insertDataVoter(votersData)
Seeds.insertVotes(votesData)

