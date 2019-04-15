const fs = require('fs')
const politicians = fs.readFileSync('./politicians.csv','utf8').split('\n').slice(1)
const dataPoliticians = []
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database.db');

for(let i = 0; i < politicians.length; i++){
    dataPoliticians.push(politicians[i].split(','))
}

class Politicians {

    static insert(input){
        db.serialize(() => {
            let sql = `INSERT INTO politicians (name, party, location, grade_current) 
            VALUES ('${input[0]}','${input[1]}', '${input[2]}', '${input[3]}')`
            db.run(sql,function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('data berhasil ditambah')
                }
            })
            
        })
    }
    
    static updateRow(input){
        console.log(input)
        let sql = `UPDATE politicians
            SET ${input[0]} = '${input[1]}'
            WHERE ${input[2]} = '${input[3]}'`
        db.run(sql, function(err){
            if(err){
                console.log(err)
            }else{
                console.log('data berhasil diubah')
            }
        })
    }
    
    static deleteRow(input){
        let sql = `DELETE FROM ${input[0]}
            WHERE ${input[1]} = ${input[2]}`
    }   
}


module.exports = Politicians