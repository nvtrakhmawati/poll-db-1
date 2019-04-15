const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function delet(id){
    const query = `DELETE FROM politicians WHERE politician_id=${id} `
                
    
        db.run(query, function(err){
            if (err){
                console.log(err)
            }else{
                console.log('successfully deleted')
            }
        })
}

delet(22)
// WHERE id = '${update[0]}'
// SET name = '${update[1]}
// party = '${update[2]}'
// location = '${update[3]}
// current_grade = '${update[4]}