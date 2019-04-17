const db = require('../connection')
class Voters {
    constructor(id, first_name, last_name, gender, age){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.age = age
    }

    static findAll(cb){
        let votersQueries = 'SELECT * FROM Voters'
        db.all(votersQueries, function (err, data) {
            if(err){
                cb(err, null)

            }else{
                let dataVoters = data.map(el => new Voters(el.id, el.first_name, el.last_name, el.gender, el.age))
                cb(null, dataVoters)
            }
            
        })

    }

    static create(first_name, last_name, gender, age, cb){
        let queries = 'INSERT INTO Politicians (first_name, last_name, gender, age) VALUES(?, ?, ?, ?)'
        db.run(queries, [first_name, last_name, gender, age], function (err, msg) {
            if(err) cb(err, null)
            else cb(null, msg)
        })

    }

    static update(where, value, cb){
        let queries = `UPDATE Voters SET `
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
        let queries = `DELETE FROM Voters WHERE id = ${id}`
        db.run(queries, function(err, msg){
            if(err) cb(err, null)
            cb(null, msg)

        })
    }

}

module.exports = Voters
