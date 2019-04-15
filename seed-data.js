const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('./databases.db')
const fs = require('fs')
const pathpoliticians = "./politicians.csv"
const pathvotes = "./votes.csv"
const pathvoters = "./voters.csv"

class InsertData{
    static insertDataToDB(file, db_name, row_names){
        let data = fs.readFileSync(file, 'utf8')
        let arrdata = data.split("\n")
        let arrdatas = []
        for (let i = 0; i < arrdata.length; i++){
            arrdatas.push(arrdata[i].split(","))
        }
        let dataFinal = arrdatas.slice(1)
        db.serialize(function(err){
            if (err){
                console.log(err)
            }else{
                for (let i = 0; i < dataFinal.length; i++){
                    db.run(`
                    INSERT INTO ${db_name} (${row_names.join(",")}) 
                    VALUES ("${dataFinal[i].join('\",\"')}")`)
                }
            }
        })
    }
}

InsertData.insertDataToDB(pathpoliticians, "politican", ["name","party","location","grade_current"])
InsertData.insertDataToDB(pathvoters, "voters", ["first_name","last_name","gender","age"])
InsertData.insertDataToDB(pathvotes, "votes", ["voterId","politicianId"])