var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('dataBase.db');  


// create new data

function createPolitician(name, party, location, grade) {
db.serialize (function () {
    let creator =`INSERT INTO politician ("name", "party", "location", "grade_current") 
        VALUES ($name, $party, $location, $grade)`
        // console.log (creator)

    db.run(creator, {
        $name : name,
        $party : party,
        $location : location,
        $grade : grade
    },function (err) {
        if (err) {
            console.log ("something wrong")
        } 
        else {
            console.log ("berhasil menambahkan data")
        }
    })
})
}


//update data

function updatePolitician(id,name, party, location, grade) {
db.serialize(function () {
    let updater = `UPDATE politician 
    SET "name" = $name, "party" = $party, "location" = $location, "grade_current" = $grade
    WHERE id = $id`

    db.run(updater,{
        $name : name,
        $party : party,
        $location : location,
        $grade : grade,
        $id : id
    },function (err) {
        if (err) {
            console.log(err);
            
            console.log ("something wrong")
        } 
        else {
            console.log ("berhasil memperbarui data")
        }
    })
})
}


// delete data

function deletePolititian(id) {
db.serialize(function () {
    let delet = `DELETE FROM politician
    WHERE id = $id`

    db.run(delet,{
        $id : id
    },function (err) {
        if (err) {
            console.log(err);
            
            console.log ("something wrong")
        } 
        else {
            console.log ("berhasil menghapus data")
        }
    })
})
}


// createPolitician("Dan Lalu", "PTRPN", "JKT", "11.48")
// updatePolitician(23, "Are Iel", "P", "JKT", "48.15")
deletePolititian(22)