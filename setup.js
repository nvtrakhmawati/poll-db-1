//your code here

const fs  = require('fs')
const sqlite3  = require('sqlite3').verbose()
// const seed = require('./seed-data')
const db = new sqlite3.Database('database.db')
db.on('error',(err)=>console.log(err))

class Setup{
    static run(){

        db.serialize(function(){
            db.run(`PRAGMA foregin_key = on`);
            db.run(`DROP TABLE IF EXISTS Politicians`);
            db.run(`DROP TABLE IF EXISTS Voters`)
            db.run(`DROP TABLE IF EXISTS Votes`)
            
            
            db.run(`CREATE TABLE IF NOT EXISTS Politicians (id integer primary key, name text, party text,location text, grade_current real)`);            
            db.run(`CREATE TABLE IF NOT EXISTS Voters (id integer primary key, first_name text,last_name text,gender text,age integer)`);    
            db.run(`CREATE TABLE IF NOT EXISTS Votes (id integer primary key, voterId integer references voters(id),politicianId integer references Politicians(id))`);
             
        })
    }
    
}

Setup.run()