const db = require('../db_init.js')

class Voters{
    constructor(input){
        this.firstName = input.firstName
        this.lastName = input.lastName
        this.gender = input.gender
        this.age = input.age
    }

    static create(obj, cb){
        let query = `INSERT INTO voters('firstName', 'lastName', 'gender', 'age') 
                     VALUES ("${obj.firstName}", "${obj.lastName}", '${obj.gender}', '${obj.age}')`
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
        let query = `SELECT * FROM "voters"`
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

module.exports = Voters