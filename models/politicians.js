const db = require('../db_init.js')

class Politicians{
    constructor(input){
        this.name = input.name
        this.party = input.party
        this.location = input.location
        this.grade_current = input.grade_current
    }

    static create(obj, cb){
        let query = `INSERT INTO politicians('name', 'party', 'location', 'grade_current') 
                     VALUES ('${obj.name}', '${obj.party}', '${obj.location}', ${obj.grade_current})`
        db.serialize( () => {
            db.run(query, (err) => {
                if(err) cb(err, null)
                else{
                    cb(null, 'success')
                }
            })
        })
    }

    static readOne(input, cb){
        let query = `SELECT * FROM "politicians" WHERE "${input.searchProperty}" = "${input.searchValue}"`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static readAll(cb){
        let query = `SELECT * FROM "politicians"`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static update(input, cb){
        let query = `UPDATE politicians SET "${input.updateProperty}" = "${input.updateValue}" WHERE "${input.searchProperty}" = "${input.searchValue}";`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) cb(err, null)
                else{
                    cb(null, 'success')
                }
            })
        })
    }

    static delete(input, cb){
        let query = `DELETE FROM politicians WHERE "${input.property}" = "${input.value}";`
        db.serialize(() => {
            db.run(query, (err) => {
                if(err) cb(err, null)
                else{
                    cb(null, 'success')
                }
            })
        })
    }

    static readVotes(name, cb){
        let query = `SELECT count(votes.politicianId) as votesCount, politicians.name
                     FROM politicians JOIN votes ON votes.politicianId = politicians.politician_id 
                     WHERE politicians.name = "${name}"`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static readParty(input, cb){
        let query = `SELECT name, party, grade_current
                     FROM politicians
                     WHERE party = "${input.party}" AND
                     grade_current BETWEEN ${input.min} AND ${input.max}`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static readLargestVotes(cb){
        let query = `SELECT count(votes.politicianId) as votesCount, politicians.name, politicians.party, politicians.location
                     FROM politicians JOIN votes 
                     ON votes.politicianId = politicians.politician_id 
                     GROUP BY votes.politicianId 
                     ORDER BY votesCount DESC LIMIT 3`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }

    static readVoters(name, cb){
        let query = `SELECT firstName, lastName, gender, age FROM voters JOIN votes ON votes.voterId = voters.voter_id 
                     WHERE votes.politicianId = (SELECT politicians.politician_id 
                     FROM politicians WHERE politicians.name = "${name}")`
        db.all(query, (err, data) => {
            if(err) cb(err, null)
            else{
                cb(null, data)
            }
        })
    }
}

module.exports = Politicians