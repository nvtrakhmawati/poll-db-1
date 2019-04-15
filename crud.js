const db = require (`./setup.js`)

class Model {

    static insert( table_name, inputArr){
    

        if (table_name == 'politicians'){

            let insertQuery = `INSERT INTO politicians(
                name,
                party,
                location,
                grade_current) 
                VALUES `
            
            
            insertQuery += `('${inputArr[0]}','${inputArr[1]}','${inputArr[2]}',${inputArr[3]})`
    
            db.run(insertQuery)
        }

        else if (table_name == 'voters'){

            let insertQuery = `INSERT INTO voters(
                first_name,
                last_name,
                gender,
                age) 
                VALUES `
            
           
            insertQuery += `('${inputArr[0]}','${inputArr[1]}','${inputArr[2]}',${inputArr[3]})`
    
            db.run(insertQuery)
        }
        
    }

    static update(table_name, column_name, id, value){
        

        let updateQuery = `UPDATE ${table_name} SET ${column_name} = "${value}" WHERE id = ${id}`

        db.run(updateQuery)

    }

    static delete(table_name, id){
        let deleteQuery =  `DELETE FROM ${table_name} WHERE id = ${id}`

        db.run(deleteQuery)
    }
}

/* 
GUIDANCE 

insert : 

    table_name, [array]

    politicians -> 
    politicians, [name, party, location, grade_current]

    voters -> 
    voters, [first_name, last_name, gender, age]

update :
    
    table_name, column_name, id, value

delete :

    table_name, id

*/

// Model.insert('politicians', [`dul`, `bebas`, `jakarta`, 0.0023])
// Model.update('politicians', 'name', 41, 'doel' )
// Model.delete('politicians', 41)