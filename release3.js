const db = require (`./setup.js`)

db.all(
    `SELECT 
        name,
        party,
        grade_current 
    FROM 
        politicians 
    WHERE 
        party = 'R' AND grade_current BETWEEN 9 AND 11
    GROUP BY 
        grade_current`, 
    function (err, data){
        if (err){
        }  
        else {
            console.log(`================================================`)
            console.log(data)
        }         
    }
)

db.all(
    `SELECT 
        (SELECT 
            count(*) 
        FROM 
            votes 
        WHERE 
            votes.politicianId = politicians.id) 
        AS 
            'totalVote',
        name 
    FROM 
        politicians
    WHERE 
        name = 'Olympia Snowe'`,
    function(err,data){
        if (err){
        }
        else {
            console.log(`================================================`)
            console.log(data)
        }
    }
)

db.all(
    `SELECT 
	    name, 
        (SELECT 
            count(*) 
        FROM 
            votes 
        WHERE 
            votes.politicianId = politicians.id ) 
        AS 
            'totalVote' 
    FROM 
        politicians
    WHERE 
        name LIKE 'ADAM%'`,
    function(err,data){
        if (err){
        }
        else {
            console.log(`================================================`)
            console.log(data)
        }
    }
)

db.all(
    `SELECT 
        (SELECT 
            count(*) 
        FROM 
            votes 
        WHERE 
            votes.politicianId = politicians.id) 
        AS 
            'totalVote' ,
	    name, 
	    party, 
	    location 
    FROM 
        politicians
    ORDER BY 
        totalVote DESC
    LIMIT 
        3`,
    function(err,data){
        if (err){
        }
        else {
            console.log(`================================================`)
            console.log(data)
        }
    }
)

db.all(
    `SELECT 
	    first_name, 
	    last_name, 
	    gender, 
	    age 
    FROM 
	    voters 
    INNER JOIN 
	    votes
    ON 
        voters.id = votes.voterId
    AND
        votes.politicianId = (  SELECT 
                                    id
                                FROM 
                                    politicians
                                WHERE
                                    name = 'Olympia Snowe'
                                ) `,
    function(err,data){
        if (err){
            console.log(err)
        }
        else {
            console.log(`================================================`)
            console.log(data)
        }
    }
)
