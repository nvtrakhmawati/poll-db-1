let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db')
const fs = require('fs')


class Politician{
    constructor(id, name, party, location, grade_current){
        this.id = id
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }

    static add(input, cb){
      let name = input.slice(0,2).join(' ')
      input[0] = name
      input.splice(1,1)
      db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ("${name}", "${input[1]}", "${input[2]}", ${input[3]})`,(err)=>{
          if (err) cb(err)
          else{
              cb(null)
          }
      })
    }

    static delete (input, cb){
        db.run(`DELETE FROM politicians WHERE id = ${input}`, (err)=>{
            if (err) cb(err)
            else{
                cb(null)
            }
        })
    }

    static update(input, cb){
        let field = input[1]
        let value = input[2]
        if (field === 'name'){
            value = input.slice(2).join(' ')
        }
        db.run(`UPDATE politicians SET ${field} = "${value}" WHERE id = ${input[0]}`, (err)=>{
            if(err) cb(err)
            else{
                cb(null)
            }
        })
    }

    static rAndBetween9And11(cb){
        db.all(`SELECT name,party,grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11`,(err,data)=>{
            if(err) cb(err)
            else{
                cb(null, data)
            }
        })
    }

    static number2(cb){
        db.all(`SELECT COUNT (*) AS totalVote, name FROM votes JOIN politicians ON politicians.id = votes.politician_id WHERE politician_id = 17`, (err, data)=>{
            if(err)cb(err)
            else{
                cb(null, data)
            }
        })
    }

    static number3(cb){
        db.all(`SELECT name, COUNT (*) AS totalVote FROM politicians JOIN votes ON votes.politician_id = politicians.id WHERE name LIKE 'Adam%' GROUP BY politicians.id`, (err,list)=>{
            if(err)cb(err)
            else{
                cb(null,list)
            }
        })
    }

    static number4(cb){
        db.all(`SELECT COUNT (*) AS totalVote, name,party,location FROM votes JOIN politicians ON politicians.id = votes.politician_id GROUP BY name ORDER BY totalVote DESC LIMIT 3`, (err,list)=>{
            if(err)cb(err)
            else{
                cb(null,list)
            }
        })
    }
    static number5(cb){
        db.all(`SELECT first_name, last_name, gender, age FROM votes JOIN voters ON voters.id = votes.voter_id JOIN politicians ON politicians.id = votes.politician_id WHERE name = "Olympia Snowe"`, (err,list)=>{
            if(err)cb(err)
            else{
                cb(null,list)
            }
        })
    }

}



module.exports = Politician