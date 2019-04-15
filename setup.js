//your code here
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('database.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.serialize(
      function(err){
          if(err){
            return console.error(err.message);
          }
          else{
            db.run(`CREATE TABLE IF NOT EXISTS "voter" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "first_name" TEXT,
                "last_name"	TEXT,
                "gender" TEXT,
                "age" INTEGER
                );`);
            db.run(`CREATE TABLE IF NOT EXISTS "politician" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" TEXT,
                "party" TEXT,
                "location" INTEGER,
                "grade_current" INTEGER 
                );`);
            db.run(`CREATE TABLE IF NOT EXISTS "vote" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "voterId" TEXT,
                "candidateId" TEXT,
                FOREIGN KEY ("voterId") REFERENCES voter("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION,
                FOREIGN KEY ("candidateId") REFERENCES politician("id")
                    ON DELETE NO ACTION ON UPDATE NO ACTION
                );`);
          }
      }
  )