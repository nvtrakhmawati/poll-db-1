const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function update (id, name, party, location, current_grade){
    const query = `UPDATE politicians SET name = "${name}", party = "${party}", location = "${location}", Grade_current =${current_grade} WHERE politician_id=${id} `
                
    
        db.run(query, function(err){
            if (err){
                console.log(err)
            }else{
                console.log('successfully updated')
            }
        })
}

update(26, 'budau', 'O', 'WI', 10.9999)
// WHERE id = '${update[0]}'
// SET name = '${update[1]}
// party = '${update[2]}'
// location = '${update[3]}
// current_grade = '${update[4]}