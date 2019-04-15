var db = require('./setup')

db.all(`
    SELECT 
        *
    FROM 
        politician
    WHERE 
        politician.party = "R"
    AND
        politician.grade_current >= 9 
    AND
	politician.grade_current <=11`,function (err,data) {
        if (err) {
            console.log (err)
        }
        else {
            console.log (data)
            console.log('===============================')
        }
    }
)
db.get(`
    SELECT 
    	name,count (*) as TotalVotes
    FROM
        votes JOIN politician
    ON 
        [votes].politicianID = politician.id
    WHERE
        politician.name = "Olympia Snowe"`,(err,data) => {
        if (err) {
            console.log (err)
        }
        else {
            console.log (data)
            console.log('===============================')
        }
        }
)
db.all(
`    SELECT
        name,politicianID,count(name)
    FROM
        votes JOIN politician
    ON
        [votes].politicianID = politician.id
    WHERE
        politician.name like "Adam%"
    GROUP BY
        name`, (err,data) => {
        if (err) {
            console.log (err)
        }
        else {
            console.log (data)
            console.log('===============================')
        } 
        }
)
db.all (
`    SELECT
        name, party, location,count (name) as Vote
    FROM
        votes JOIN politician
    ON
        [votes].politicianID = politician.id
    GROUP BY 
        name
    ORDER BY
        Vote DESC
    LIMIT 
        3`, (err,data) => {
        if (err) {
            console.log (err)
        }
        else {
            console.log (data)
            console.log('===============================')
        } 
        }
)

db.all (
    `SELECT
        first_name,last_name,gender,age
    FROM
        voters 
    JOIN votes
        ON 
        [votes].voterID = voters.id
    JOIN politician
        ON 
        [votes].politicianID = politician.id
    WHERE
        politician.name = "Olympia Snowe"`, (err,data) => {
        if (err) {
            console.log (err)
        }
        else {
            console.log (data)
            console.log('===============================')
        } 
        }
)