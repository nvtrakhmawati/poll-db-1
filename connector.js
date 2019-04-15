const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db',function(err){
    if(err){
        console.log(err.message)
    }else{
        console.log('connected to database')
    }
});

module.exports = db
