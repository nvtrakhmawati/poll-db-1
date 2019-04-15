const db = require('./connector.js')

let argv = process.argv
let command = argv[2]
let input = argv.slice(3)

function insertData(input){
    db.serialize(function(){
        db.run(`INSERT INTO politicians (name,party,location,grade_current) VALUES('${input[0]}','${input[1]}','${input[2]}','${input[3]}')`,function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log('successfully added')
            }
        })
    })
}

function updateData(input){
    db.serialize(function(){
        db.run(`UPDATE politicians SET name = "${input[1]}" WHERE id = "${input[0]}"`,function(err){
            if(err){
                console.log(err);
            }else{
                console.log('successfully updated')
            }
        })
    })
}

function deleteData(input){
    db.serialize(function(){
        db.run(`DELETE FROM politicians WHERE id = "${input[0]}"`,function(err){
            if(err){
                console.log(err)
            }else{
                console.log('sucessfully deleted')
            }
        })
    })
}

switch(command){
    case 'create':
        insertData(input)
    break
    case 'update':
        updateData(input)
    break
    case 'delete':
        deleteData(input)
    break
    default:
        console.log(`
            welcome!
            node crud.js create <name> <party> <location> <grade_current>
            node crud.js update <id> <new name>
            node crud.js delete <id>
        `)
}