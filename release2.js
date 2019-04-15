const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");

function insertData(name, party, location, grade_current) {
    db.run(`INSERT INTO politicians (name, party, location, grade_current) 
            VALUES ('${name}', '${party}', '${location}', '${grade_current}');`, (err) => {
                if(err) {
                    console.log(err)
                }
                else {
                    console.log(`Politician "${name}" has been inserted into the database.`)
                }
            })
}

function updateData(id, columnName, newValue) {
    db.serialize(function() {
        db.run(`UPDATE politicians
                SET ${columnName} = '${newValue}'
                WHERE id = ${id};`, (err) => {
                    if(err) {
                        console.log(err)
                    }
                })
        db.get(`SELECT * FROM politicians WHERE id = ${id}`, (err, row) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log(`Politician "${row.name}" (id: ${row.id}) has been updated.`)
            }
        });
    });
}

function deleteData(id) {
    db.serialize(function() {
        db.get(`SELECT * FROM politicians WHERE id = ${id};`, (err, row) => {
            if(err) {
                console.log(err)
            }
            else {
                console.log(`Politician "${row.name}" (id: ${row.id}) has been deleted from the database.`)
            }
        });
        db.run(`DELETE FROM politicians WHERE id = ${id};`, (err) => {
            if(err) {
                console.log(err)
            }
        })
    });
}

// Tests (Uncomment first)

// insertData("Asap Ferg", "D", "NY", 12.33);
// updateData(8, "location", "RI")
// deleteData(2)