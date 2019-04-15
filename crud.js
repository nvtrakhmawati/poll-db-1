var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./database.db')

class CRUD{
    static insert(tableName,column_name,values){
        let query = `INSERT INTO ${tableName}(${column_name.join(',')}) VALUES ("${values.join('\",\"')}")`
        db.run(query, function (err) {
            if (err) console.log(err)
            else console.log('berhasil')
        });
    }

    static update(table_name, column_name, id, value){
        let update = `UPDATE ${table_name} SET ${column_name} = "${value}" WHERE id = ${id}`
        db.run(update, function (err) {
            if (err) console.log(err)
            else console.log('berhasil')
        });
    }

    static delete(table_name, id){
        let queryDel =  `DELETE FROM ${table_name} WHERE id = ${id}`
        db.run(queryDel, function (err) {
            if (err) console.log(err)
            else console.log('berhasil')
        });
    }
}

CRUD.insert('politicians',["name", "party", "location", "grade_current"],["jokowi","PDIP","Jakarta","9.87"])
/*

CRUD.insert('politicians',["name", "party", "location", "grade_current"],["jokowi","PDIP","Jakarta","9.87"])
["name", "party", "location", "grade_current"]
CRUD.update('politicians', 'location', 21, 'Solo')
CRUD.delete('politicians', 21)

*/