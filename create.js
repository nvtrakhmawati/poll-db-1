// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('./database.db')

// const add = process.argv.slice(2)
// const query = `INSERT INTO politicians (name, party, location, grade_current)
//                 VALUES ('${add[0]}', '${add[1]}', '${add[2]}', '${add[3]}')`
            
//             db.run(query, function(err) {
//             if(err){
//                 console.log('error')
//             }else{
//                 console.log('create data to politician successfull')
//             }
//             })

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function create (name, party, location, current_grade){
    const query = `INSERT INTO politicians VALUES (null, "${name}", "${party}", "${location}", "${current_grade}")`
                
    
        db.run(query, function(err){
            if (err){
                console.log(err)
            }else{
                console.log('successfully created')
            }
        })
}

create('budi', 'R', 'WI', 10.9999)
// WHERE id = '${update[0]}'
// SET name = '${update[1]}
// party = '${update[2]}'
// location = '${update[3]}
// current_grade = '${update[4]}
    