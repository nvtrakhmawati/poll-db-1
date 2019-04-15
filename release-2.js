const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

/** CREATE */
let newPolitician = {
    name : "Nurhadi",
    party: "koalisi",
    location : "berflower",
    grade_current: "99"
}

let newVoter = {
    first_name : "siapa",
    last_name : "siapa",
    gender : "female",
    age : "21"
}

let newVote = {
    candidateId : "12",
    voterId : "12"
}

function insertNewData(tableName, objValues){
if(tableName == null || objValues == null){
    return "input yang bener dong"
}
let sql = "INSERT INTO " + tableName + "(\n"

let targetColumn = []
for(let i in objValues){
targetColumn.push(i)
}

let theValue = ""
for(let i = 0; i < targetColumn.length; i++){
    if(i != targetColumn.length-1){
        sql += targetColumn[i] +",\n"
        theValue += `"${objValues[targetColumn[i]]}"` + ",\n" 
    }
    else{
        sql += targetColumn[i] +")\n"
        theValue += `"${objValues[targetColumn[i]]}"` + ");"
    }
}

sql += "VALUES(\n" + theValue
console.log(sql)
db.run(sql, function(err){
    if(err){
        return console.error(err.message);
    }else{
        console.log(`successfully addedd new row into ${tableName}`)
    }
})
}
//test cases
// insertNewData('politician', newPolitician)
// insertNewData('voter', newVoter)
// insertNewData('vote', newVote)

/** UPDATE */
let updatedPolitician = {
    party: "koalisi",
    location : "berflower"
}
function updateById(inTable, whereId, newValue){
if(inTable == null || whereId == null|| newValue == null){
    return "input yang bener dong"
}
let sql = "UPDATE\n" + inTable + "\nSET\n"

let targetColumn = []
for(let i in newValue){
targetColumn.push(i)
}


for(let i = 0; i < targetColumn.length; i++){
    if(i != targetColumn.length-1){
        sql += targetColumn[i] +" = " + `"${newValue[targetColumn[i]]}"` + ",\n" 
    }
    else{
        sql += targetColumn[i] +" = " + `"${newValue[targetColumn[i]]}"` + "\n"
    }
}

sql += `WHERE\n${inTable}.id = ${whereId};`

// console.log(sql)
db.run(sql, function(err){
    if(err){
        return console.error(err.message);
    }else{
        console.log(`successfully updated row with id : ${whereId} in the "${inTable}" table`)
    }
})
}
//test cases
// updateById('politician', 1, updatedPolitician)


/** DELETE */
function deleteById(inTable, whereId){
let sql = "DELETE FROM\n" + inTable + "\nWHERE\n" + inTable +".id = " + whereId  
db.run(sql, function(err){
        if(err){
            return console.error(err.message);
        }
        else{
            console.log(`successfully remove data in ${inTable} where id is ${whereId}`)
        }
    })
}
//test cases
// deleteById('politician', 1)