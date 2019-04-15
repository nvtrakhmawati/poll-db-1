const db = require("./db")

function insertVoter(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`insert into voters(first_name,last_name,gender,age) values (?, ?, ?, ?)`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}

function insertPolitician(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`insert into politicians(name,party,location,grade_current) values (?, ?, ?, ?)`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}

function updatePolitician(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`UPDATE politicians
      SET party = ?
      WHERE name = ?`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}
function updateVoter(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`UPDATE voters
      SET age = ?
      WHERE first_name = ?`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}

function deletePolitician(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`delete from politicians where name = ?`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}

function deleteVoter(data){
  db.serialize(function(err) {
    if(err) console.log(err)
    else{
      db.run(`delete from voters where first_name = ?`,data,function(err){
        if(err) console.log(err); 
      })
    }
  })
}

insertPolitician(["jokowi","P","JKT",80])
insertVoter(["jokowi","Dodo","Male",60])
updatePolitician(["C","jokowi"])
updateVoter([70,"jokowi"])
deletePolitician("jokowi")
deleteVoter("jokowi")