const db = require('../connection')
class Polticians {
    constructor(id, name, party, location, grade_curent){
        this.id = id
        this.name = name
        this.party = party
        this.location = location
        this.grade_curent = grade_curent
    }

    static findAll(cb){
        let politiciansAllData = 'SELECT * FROM Politicians'
        db.all(politiciansAllData ,function (err, rows) {
            if(err){
                cb(err, null)
            }else{
                let rowsOfPoliticians = rows.map(el => new Polticians(el.id, el.name, el.party, el.location, el.grade_current))
                cb(null, rowsOfPoliticians)
            }
        })  
    }

    static create(name, party, location, grade_curent, cb){
        let politician = new Politicians(null, name, party, location, grade_curent)
        let queries = 'INSERT INTO Politicians (name, party, location, grade_current) VALUES(?, ?, ?, ?)'
        db.run(queries, [name, party, location, grade_curent], function (err) {
            if(err) cb(err, null)
            else {
                politician.id = this.lastID
                cb(null, politician)
            }
        })

    }

    static update(where, value, cb){
        let queries = `UPDATE Politicians SET `
        let obj = {}
        value.map(function (element, i) {
            if (i % 2 === 0) {
                obj = Object.assign(obj, { [element]: value[i + 1] });
            }

        })

        let afterSet = ''
        for (const key in obj) {
            if(obj[key] === undefined){
                delete obj[key]
            }else{
                afterSet += `${key} = '${obj[key]}',`
            }
           
        }
        queries += `${afterSet.slice(0,-1)} WHERE ${where[0]} = '${where[1]}'`
        db.run(queries, function (err, msg) {
            if(err){
                cb(err, null)
            }else{
                cb(null, msg)
            }
            
        })

    }

    static delete(id, cb){
        let queries = `DELETE FROM Politicians WHERE id = ${id}`
        db.run(queries, function(err, msg){
            if(err) cb(err, null)
            cb(null, msg)

        })
    }


}

module.exports = Polticians