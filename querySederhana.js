const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
/*

// cari R
SELECT *
FROM politicians
WHERE Party = 'R'
AND Grade_current BETWEEN 9 and 11


// jumlah vote untun OLympia Snowe
SELECT count(votes.politician_id) as totalVote,  politicians.Name
FROM politicians 
JOIN votes on votes.politician_id = politicians.politician_id
WHERE politicians.Name = 'Olympia Snowe'
GROUP by politicians.name


//Politician yg namanya Adam
SELECT  politicians.Name, count(votes.politician_id) as totalVote
FROM politicians 
JOIN votes on votes.politician_id = politicians.politician_id
WHERE politicians.Name like 'Adam%'
GROUP by politicians.name

//3 politician 
SELECT  count(votes.politician_id) as totalVote, politicians.Name, politicians.Party, politicians.Location
FROM politicians 
JOIN votes on votes.politician_id = politicians.politician_id
GROUP by politicians.name
ORDER by totalVote DESC
LIMIT 3

//siapa yg vote olympia
SELECT voters.first_name, voters.last_name, voters.gender, voters.age
FROM voters
JOIN votes on votes.voter_id = voters.voters_id
JOIN politicians on politicians.politician_id = votes.politician_id
WHERE politicians.Name = 'Olympia Snowe'

*/


