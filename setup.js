//your code here
const db = require('./connection')

db.serialize(function () {
    let politicianQueries = `CREATE TABLE IF NOT EXISTS Politicians (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        location TEXT,
        grade_current REAL
    )`
    let voterQueries = `CREATE TABLE IF NOT EXISTS Voters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        gender TEXT,
        age INTEGER
    )`
    let votesQueries = `CREATE TABLE IF NOT EXISTS Votes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        polticiansId INTEGER REFERENCES Polticians (id),
        votersId INTEGER REFERENCES Voters (id)
    )`
    db.run(`DROP TABLE IF EXISTS Politicians`, function (err) {
        if(err) throw err
        console.log('table poltisi berhasil dihapus');
        
        
    })
    db.run(`DROP TABLE IF EXISTS Voters`, function (err) {
        if(err) throw err
        console.log('table voters berhasil dihapus');
        
        
    })
    db.run(`DROP TABLE IF EXISTS Votes`, function (err) {
        if(err) throw err
        console.log('table votes berhasil dihapus');
        
        
    })
    db.run(politicianQueries, function (err) {
     if(err) throw err
     console.log('data politisi masuk');
     
        
    })

    db.run(voterQueries, function (err) {
       if(err) throw err
       console.log('data voter masuk');
       
        
    })

    db.run(votesQueries, function (err) {
        if(err) throw err
        console.log('data votes masuk');
         
    })
    
})
db.close()