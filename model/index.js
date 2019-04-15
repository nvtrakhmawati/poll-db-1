const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

class Politician {
    constructor(name,party,location,grade_current){
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current 
    }
    static create(table,input,cb){
        let politician = new Politician(input[0], input[1],input[2],input[3])

        db.run(`INSERT INTO ${table} (name,party,location,grade_current) 
        VALUES(?,?,?,?)`,[politician.name, politician.party,politician.location,politician.grade_current],
        err => {
            if(err) cb(err)
            else cb()
        })
    }
    static update(input,cb){
        db.run(`UPDATE Politicians 
        SET ${input[0]} = '${input[1]}' 
        WHERE ${input[2]} = ${input[3]}`,
        err=>{
            if(err) cb(err)
            else cb()
        })
    }
    static delete(input,cb){
        db.run(`DELETE FROM Politicians WHERE ${input[0]} = ${input[1]}`,err=>{
            if(err)cb(err)
            else cb()
        })
    }
}
class Voter {
    constructor(first_name,last_name,gender,age){
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.age = age
    }
    static create(table,input,cb){
        let voter = new Voter(input[0], input[1],input[2],input[3])

        db.run(`INSERT INTO ${table} (first_name,last_name,gender,age) 
        VALUES(?,?,?,?)`,[voter.first_name, voter.last_name,voter.gender,voter.age],
        err => {
            if(err) cb(err)
            else cb()
        })
    }
    static update(input,cb){
        db.run(`UPDATE Voters 
        SET ${input[0]} = '${input[1]}' 
        WHERE ${input[2]} = ${input[3]}`,
        err=>{
            if(err) cb(err)
            else cb()
        })
    }
    static delete(input,cb){
        db.run(`DELETE FROM Voters WHERE ${input[0]} = ${input[1]}`,err=>{
            if(err)cb(err)
            else cb()
        })
    }
}
class Vote {
    constructor(voterId, politicianId){
        this.voterId = voterId,
        this.politicianId = politicianId
    }
    static create(table,input,cb){
        let vote = new Vote(input[0], input[1])
        db.run(`INSERT INTO ${table} (voterId,politicianId) 
        VALUES(?,?)`,[vote.voterId, vote.politicianId],
        err => {
            if(err) cb(err)
            else cb()
        })
    }
    static update(input,cb){
        db.run(`UPDATE Votes 
        SET ${input[0]} = '${input[1]}' 
        WHERE ${input[2]} = ${input[3]}`,
        err=>{
            if(err) cb(err)
            else cb()
        })
    }
    static delete(input,cb){
        db.run(`DELETE FROM Voters WHERE ${input[0]} = ${input[1]}`,err=>{
            if(err)cb(err)
            else cb()
        })
    }
}
module.exports = {
    Politician : Politician,
    Voters : Voter,
    Votes : Vote
}
