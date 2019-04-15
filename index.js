var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err)=>{
    if(!err){
        console.log('successfuly connects with database')
    }else{
        console.log(err)
    }
});

function insertData (tableName, data){
    db.serialize(function(err){
        if(tableName === 'Politicians'){
            if(err){
                console.log(err)
            }else{
                db.run(`INSERT INTO ${tableName} (name, party, location, grade_current)
                VALUES ("${data.name}", '${data.party}', '${data.location}', '${data.grade_current}')`)
                console.log('insert data successful')
            }
        } else if(tableName === 'Voters'){
            if(err){
                console.log(err)
            }else{
                db.run(`INSERT INTO ${tableName} (first_name, last_name, gender, age)
                VALUES ("${data.first_name}", '${data.last_name}', '${data.gender}', '${data.age}')`)
                console.log('insert data successful')
            }
        }        
    })
}

let dataInsert = {
    name : 'Jon', party : 'D', location : 'Jakarta', grade_current :'10'
}
// insertData('Politicians', dataInsert)

function update (tableName, column, value, id){
    db.serialize(function(){
        db.run(`UPDATE ${tableName}
        SET ${column} = "${value}"
        WHERE id = ${id}`)
    })
}


function del (tableName, id){
    db.serialize(function(){
        db.run(`DELETE FROM ${tableName} WHERE id = ${id}`)
    })
}

// del('Politicians', 22)

// Release 3
db.serialize(function(){
    //release 3 part 1
    db.all(`SELECT name, party, grade_current
    FROM Politicians
    WHERE party = 'R' 
      AND grade_current BETWEEN 9 AND 11`, function(err, rows){
          if(!err){
              console.log(rows)
          }else{
              console.log(err)
          }
    }) 

    //release 3 part 2
    db.all(`SELECT COUNT(id) AS totalVote, (SELECT Politicians.name FROM Politicians WHERE Politicians.name = 'Olympia Snowe') AS name
    FROM Votes
    WHERE Votes.politicianId = (SELECT Politicians.id FROM Politicians WHERE Politicians.name = 'Olympia Snowe')`, function(err, rows){
        if(err){
            console.log(err)
        }else{
            console.log(rows)
        }
    })

    //release 3 part 3
    db.all(`SELECT name, (SELECT COUNT(*) FROM Votes WHERE Politicians.id = Votes.politicianId) AS totalVotes
    FROM Politicians
    WHERE Politicians.name like '%Adam%'`, (err, row)=>{
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })

    //release 3 part 4
    db.all(`
    SELECT (SELECT count(*) FROM Votes WHERE Votes.politicianId = Politicians.id) AS totalVoters
    FROM Politicians`,
     function(err,rows){
        if(err) console.log(err)
        else console.log(rows)
    })
})



