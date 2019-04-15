const fs = require('fs')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

class Seed{
    static readFiles(fileName){
        let result = []
        let datas = fs.readFileSync(fileName,'utf8')
        datas = datas.split('\n')
        for(let i = 0; i < datas.length; i++){
            result.push(datas[i].split(','))
        }
        return result
    }

    static inputDatabase(fileName,tableName,columnName){
        let datas = Seed.readFiles(fileName)
        datas = datas.slice(1)
        db.serialize(function(err){
            if(err) console.log(err)
            else{
                for(let i = 0; i < datas.length; i++){
                    var query = `INSERT INTO ${tableName} (${columnName.join(",")}) VALUES ("${datas[i].join('\",\"')}")`
                    db.run(query, function (err) {
                        if (err) console.log(err)
                        else console.log('berhasil')
                    });
                }
            }
        })
    }
}
Seed.inputDatabase('./politicians.csv','politicians',["name", "party", "location", "grade_current"])
Seed.inputDatabase('./voters.csv','voters',["first_name","last_name","gender","age"])
Seed.inputDatabase('./votes.csv','votes',["voterId","politicianId"])