const db = require('./setup.js')
class Crud{
    constructor(){

    }
    static insertData(tableName,data){
        if( tableName === 'politicians'){
            const query = `INSERT INTO politicians(name, party, location,currentGrade)
                            VALUES ("${data[0]}", "${data[1]}", "${data[2]}",${data[3]})`
            db.all(query,function(err,row){
                if(err) throw err;
                else{

                }
                console.log('Succesfully insert new row!')
            })
        }
        else if(tableName === 'voters'){
            const query = `INSERT INTO voters(firstName, lastName, gender, age)
                            VALUES ("${data[0]}", "${data[1]}", "${data[2]}",${data[3]})`
            db.all(query,function(err,row){
                if(err) throw err;
                else{

                }
                console.log('Succesfully insert new row!')
            })
        }
    }

    static updateData(tableName,columnName,value,index){
            const query = `UPDATE ${tableName}
                            SET ${columnName} = "${value}"
                             WHERE id=${index}`;
                db.all(query, function (err,row){
                    if(err) throw err;
                    else{

                    }
                    console.log('Succesfully updated!');
                    });
    }

    static deleteData(tableName,index){
            const query = `DELETE FROM ${tableName} WHERE id=${index}`;
            db.all(query, function(err,row){
                if(err) throw err;
                else{
                    
                }
                console.log('Successfully deleted!');
            });
    }
}

function search1(){
    let query = `select * from politicians
                where party = 'R' AND currentGrade BETWEEN 9 and 11`
    db.all(query,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}

// search1()

function search2(){
    let query = `with query as (select politicianId,count (*) as 'totalVotes' from votes 
    where politicianId = (select id from politicians
        WHERE name = 'Olympia Snowe'))
    SELECT query.totalVotes,politicians.name
        from query join politicians
    on politicians.id = query.politicianId`
    db.all(query,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}

// search2()

function search3(){
    let query = `select name,
	            (select count(*) from votes where votes.politicianId = politicians.id) as totalVotes
	            from politicians
                WHERE name
	            like 'adam%'`
    db.all(query,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}

// search3()

function search4(){
    let query = `SELECT (select count(*) from votes where votes.politicianId = politicians.id) as totalVotes,
                name,
                party,
                location
                FROM politicians
                order by totalVotes DESC
                LIMIT 3`
    db.all(query,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}

// search4()

function search5(){
    let query = `with query as(select voterId from votes
                WHERE politicianId = (select id from politicians where name = 'Olympia Snowe')
                )
                SELECT voters.firstName,voters.lastName,voters.gender,voters.age
                FROM query join voters
                on voters.id = query.voterId
                `
    db.all(query,function(err,row){
        if(err){
            console.log(err)
        }else{
            console.log(row)
        }
    })
}

search5()



// Crud.insertData('politicians',['rizky andi jani','demokrat','DKI','23'])
// Crud.updateData('politicians','name','andi',21)
// Crud.deleteData('politicians',23)
// Crud.insertData('voters',['rizky andi jani','demokrat','DKI','100'])
// Crud.updateData('voters','firstName','andijan',151)
// Crud.deleteData('voters',151)
