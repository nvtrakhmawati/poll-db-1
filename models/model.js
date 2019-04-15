const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

class Politician {
    constructor(name, party, location, grade_current) {
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }

    static findOne([field, value], cb) {
        const query = `SELECT * FROM Politicians
            WHERE ${field} = "${value}"
        `
        db.get(query, (err, data) => {
            if (err) cb(err)
            else cb(null, new Politician(data.name, data.party, data.location, data.grade_current))
        })
    }

    static findAll([field, value], cb) {
        if (!field || !value){
            var query = `SELECT * FROM Politicians`
        }else {
            var query = `SELECT * FROM Politicians
                WHERE ${field} = "${value}"
            `
        }
        db.all(query, (err, data) => {
            if (err) cb(err)
            else {
                let result = []
                for(let i = 0 ; i < data.length ; i++){
                    result.push(new Politician(data[i].name, data[i].party, data[i].location, data[i].grade_current))
                }
                cb(null , result)
            }
        })
    }
    
    static create(input, cb){
        const query = `
        INSERT INTO Politicians (name, party, location, grade_current)
        VALUES (?,?,?,?)
        `
        db.run(query, input, err=>{
            if(err)cb(null)
            else cb()
        })
    }
    
    static update([whereField, whereValue, setField, setValue],cb){
        const query = `
        UPDATE Politicians
            SET ${setField} = '${setValue}'
            WHERE ${whereField} = "${whereValue}"
        `
        db.run(query , err=>{
            if(err)cb(err)
            else cb()
        })
    }

    static delete([field, value], cb){
        const query = `
            DELETE FROM Politicians
                WHERE ${field} = "${value}"
        `
        db.run(query, err=>{
            if(err)cb(err)
            else cb()
        })
    }
}

class Voter {
    constructor(first_name, last_name, gender, age) {
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.age = age
    }

    static findOne([field, value], cb) {
        const query = `SELECT * FROM Voters
            WHERE ${field} = "${value}"
        `
        db.get(query, (err, data) => {
            if (err) cb(err)
            else cb(null, new Voter(data.first_name, data.last_name, data.gender, data.age))
        })
    }

    static findAll([field, value], cb) {
        if (!field || !value){
            var query = `SELECT * FROM Voters`
        }else {
            var query = `SELECT * FROM Voters
                WHERE ${field} = "${value}"
            `
        }
        db.all(query, (err, data) => {
            if (err) cb(err)
            else {
                let result = []
                for(let i = 0 ; i < data.length ; i++){
                    result.push(new Voter(data[i].first_name, data[i].last_name, data[i].gender, data[i].age))
                }
                cb(null , result)
            }
        })
    }

    static create([first_name, last_name, gender, age], cb){
        const query = `
            INSERT INTO Voters (first_name, last_name, gender, age)
            VALUES ("${first_name}","${last_name}","${gender}","${age}")
        `
        db.run(query, err=>{
            if(err)cb(null)
            else cb()
        })
    }

    static update([whereField, whereValue, setField, setValue],cb){
        const query = `
        UPDATE Voters
            SET ${setField} = "${setValue}"
            WHERE ${whereField} = "${whereValue}"
        `
        db.run(query , err=>{
            if(err)cb(err)
            else cb()
        })
    }

    static delete([field, value], cb){
        const query = `
            DELETE FROM Voters
                WHERE ${field} = "${value}"
        `
        db.run(query, err=>{
            if(err)cb(err)
            else cb()
        })
    }
}

class Vote {
    constructor(voterId, politicianId) {
        this.voterId = voterId
        this.politicianId = politicianId
    }

    static findOne([field, value], cb) {
        const query = `SELECT * FROM Votes
            WHERE ${field} = "${value}"
        `
        db.get(query, (err, data) => {
            if (err) cb(err)
            else cb(null, new Vote(data.voterId, data.politicianId))
        })
    }

    static findAll([field, value], cb) {
        if (!field || !value){
            var query = `SELECT * FROM Votes`
        }else {
            var query = `SELECT * FROM Votes
                WHERE ${field} = "${value}"
            `
        }
        db.all(query, (err, data) => {
            if (err) cb(err)
            else {
                let result = []
                for(let i = 0 ; i < data.length ; i++){
                    result.push(new Vote(data[i].voterId, data[i].politicianId))
                }
                cb(null , result)
            }
        })
    }

    static create([voterId, politicianId], cb){
        const query = `
            INSERT INTO Votes (voterId, politicianId)
            VALUES ("${voterId}","${politicianId}")
        `
        db.run(query, err=>{
            if(err)cb(null)
            else cb()
        })
    }

    static update([whereField, whereValue, setField, setValue],cb){
        const query = `
        UPDATE Votes
            SET ${setField} = "${setValue}"
            WHERE ${whereField} = "${whereValue}"
        `
        db.run(query , err=>{
            if(err)cb(err)
            else cb()
        })
    }

    static delete([field, value], cb){
        const query = `
            DELETE FROM Votes
                WHERE ${field} = "${value}"
        `
        db.run(query, err=>{
            if(err)cb(err)
            else cb()
        })
    }
}

module.exports = {
    Politician,
    Voter,
    Vote
}