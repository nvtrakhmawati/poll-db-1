const sqlite3 = require('sqlite3').verbose()
// const seed = require('./seed-data')
const db = new sqlite3.Database('database.db')

class Politician {
    constructor({ id, name, party, location, grade_current }) {
        this.id = id || null
        this.name = name || null
        this.party = party || null
        this.location = location || null
        this.grade_current = grade_current || null
    }
    static findOneBy(parameters, cb) {
        let where = {}

        if(Array.isArray(parameters)){
            parameters = [...parameters]
            parameters = parameters.reduce((acc,crr)=> !(i%2) ? {...acc,[crr]:parameters[i+1]} : acc) 
            where = parameters
        } else if (typeof parameters === 'object'){
            parameters = {...parameters}
            Object.keys(parameters).forEach(key=>{
                if(parameters(key) === null || parameters(key) === undefined) delete parameters[key]
            })
            where = parameters
        } 
        
        let whereClause = (Object.keys(where).length==0)?``:` where  ${Object.keys(where).map(key=> ` ${key} = ?`).join(' AND ')}`
        let selectClause =`select * from politicians ${whereClause}`

        db.get(selectClause, (err,data)=>{
            if(err) throw err
            else  {
                //convert here to Politican instance here
                cb(null, data)}
        })
    }
    static findAllBy(parameters, cb) {
        db.all(`select * from politicians`, cb)
    }    
}

class Voter {
    constructor({ id, first_name, last_name, gender, age }) {
        this.id = id || null
        this.first_name = first_name || null
        this.last_name = last_name || null
        this.gender = gender || null
        this.age = age || null
    }
    static findOne(cb) {

    }
    static findAll(cb) {
        db.all(`select * from voters`)
    }
}

class Vote {
    constructor({ id, voterId, politicianId }) {
        this.id = id || null
        this.voterId = voterId || null
        this.politicianId = politicianId|| null
    }

    static findOne(cb) {

    }
    static findAll(cb) {
        db.all(`select * from votes`)
    }
}