//your code here
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./poll.db')

db.serialize(()=>{
    db.run(`CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    )`, (err)=>{
        if(err) console.log(err)
        else{
            console.log(`politcians table has been added`)
        }
    })
    db.run(`CREATE TABLE IF NOT EXISTS Voters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`, (err)=>{
        if (err)console.log(err)
        else{
            console.log(`voters table has been added`)
        }
    })

    db.run(`CREATE TABLE IF NOT EXISTS Votes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voter_id INTEGER,
        politician_id INTEGER,
        FOREIGN KEY ("voter_id") REFERENCES voters(id),
        FOREIGN KEY ("politician_id") REFERENCES politicians(id)
    )`, (err)=>{
        if (err)console.log(err)
        else{
            console.log('votes table has been added')
        }
    })
})

// db.close((err) =>{
//     if (err){
//         console.log(err)
//     }else {
//         console.log('closed')
//     }
// })

module.exports = db