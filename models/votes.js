const db = require('../db_init.js')

class Votes{
    constructor(input){
        this.voterId = input.voterId
        this.politicianId = input.politicianId
    }

    static create(obj, cb){
        let query = `INSERT INTO votes('voterId', 'politicianId') 
                     VALUES ("${obj.voterId}", "${obj.politicianId}")`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) cb(err, null)
                else{
                    cb(null, 'success')
                }
            })
        })
    }

    static readOne(){

    }

    static readAll(cb){
        let query = `SELECT * FROM "votes"`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static update(){
        
    }

    static delete(){

    }
}

module.exports = Votes