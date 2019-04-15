const db = require('sqlite3').verbose();
const database = new db.Database("./database.db");

function insertDataPolition(data){
    database.run(`INSERT INTO politicians ("name", "party", "location", "grade_current") VALUES ("${data[0]}","${data[1]}","${data[2]}","${data[3]}")`, function(err){
        if(err){
            console.log("input data gagal")
        }
    })
}

function updatetDataPolition(dataChange, dataNew){
    database.run(`UPDATE politicians SET name = "${dataNew}" WHERE name = "${dataChange}" `, function(err){
        if(err){
            console.log("input data gagal")
        } else {
            console.log(`data ${dataChange} sudah diubah menjadi ${dataNew}`)
        }
    })

}

// function deleteDataPolition(id){
//     let query = `DELETE from politicians WHERE id = ${id}`
//     database.run(query, function(err){
//         if(err){
//             console.log(err)
//         } else {
//             console.log(`sudah berhasil delete data dengan id ${id}`)
//         }

//     })
// }



// function sortRelease3no1(){
//     let query = 'SELECT name, party, grade_current FROM politicians WHERE party = "R" AND grade_current BETWEEN 9 AND 11'
//     database.all(query, function(err, sortResult){
//         if(err){
//             console.log(err)
//         } else {
//             console.log(JSON.stringify(sortResult,null, 2))
//         }
//     })
// }

// function sortRelease3no2(){
//     let query = 'SELECT count(*) as totalVote, politicians.name FROM votes INNER JOIN politicians ON votes.politician_id = politicians.id WHERE politicians.id = 17'
//     database.all(query, function(err, sortResult){
//         if(err){
//             console.log(err)
//         } else {
//             console.log(JSON.stringify(sortResult,null, 2))
//         }
//     })
// }

function sortRelease3no3(){
    let query = 'SELECT name,(SELECT count(*) FROM votes WHERE votes.politician_id = politicians.id) AS totalVote FROM politicians WHERE name like "%Adam%"'
    database.all(query, function(err, sortResult){
        if(err){
            console.log(err)
        } else {
            console.log(JSON.stringify(sortResult,null, 2))
        }
    })
}


// function sortRelease3no4(){
//     let query = 'SELECT (SELECT count(*) FROM votes WHERE votes.politician_id = politicians.id) AS totalVote , name , party, location FROM politicians ORDER BY totalVote DESC LIMIT 3'
//     database.all(query, function(err, sortResult){
//         if(err){
//             console.log(err)
//         } else {
//             console.log(JSON.stringify(sortResult,null, 2))
//         }
//     })
// }

function sortRelease3no5(){
    let query = 'SELECT first_name,last_name,gender,age from voters JOIN votes ON voters.id = votes.voters_id JOIN politicians ON votes.politician_id = politicians.id WHERE name = "Olympia Snowe"'
    database.all(query, function(err, sortResult){
        if(err){
            console.log(err)
        } else {
            console.log(JSON.stringify(sortResult,null, 2))
        }
    })
}
sortRelease3no5()
// sortRelease3no4()
// sortRelease3no3()
// sortRelease3no2()

// sortRelease3no1()

// insertDataPolition(["Jokowow","demokrat","jakarta","6"])
// updatetDataPolition("Jokowow","prabowo")
// deleteDataPolition(21)