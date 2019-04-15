const db = require('../setup')
const View = require('../views/view')

class Controller {
    static insert(table, values) {
        const INSERT_QUERY = `INSERT INTO ${table} VALUES (?, ${values.map(x => '?' )}) `
        let stmt = db.prepare(INSERT_QUERY)
        values.unshift(null)

        stmt.run(values)
        stmt.finalize()
        console.log(INSERT_QUERY);
    }

    static update(table, condition,[ values, newValues]) {
        const UPDATE_QUERY = `UPDATE ${table} SET ${condition} = '${newValues}' WHERE ${condition} = '${values}'`

        db.run(UPDATE_QUERY)
        console.log(UPDATE_QUERY);
    }

    static delete(table, condition, values) {
        const DELETE_QUERY = `DELETE FROM ${table} WHERE ${condition} = '${values}'`

        db.run(DELETE_QUERY)
        console.log(DELETE_QUERY);
    }

    static inParty([party, grade1, grade2]) {
        const in_party = `SELECT name, party, grade_current FROM politicians
            WHERE party = '${party}' AND grade_current >= ${grade1} AND grade_current <= ${grade2}`


        db.all(in_party, (err,rows) => {
            if(err) {
                View.showError(err)
            }else{
                View.show(rows)
            }
        }) 
    }

    static count(policianName) {
        const count = `SELECT count(*) AS total_count, name FROM politicians
        JOIN voters, votes ON votes.politicianID = politicians.id AND votes.voterId = voters.id
        WHERE name = '${policianName}'`

        db.all(count, (err,rows) => {
            if(err) {
                View.showError(err)
            }else{
                View.show(rows)
            }
        }) 
    }

    static bigThree() {
        const bigThree = `SELECT name, party, location, count(*) AS totalVote FROM politicians
        JOIN votes ON politicians.id = votes.politicianID
        GROUP BY name
        ORDER BY totalVote DESC
        LIMIT 3`

        db.all(bigThree, (err,rows) => {
            if(err) {
                View.showError(err)
            }else{
                View.show(rows)
            }
        }) 
    }

    static whoVote(policianName) {
        const whoVote = `SELECT first_name, last_name, gender, age FROM voters
        JOIN politicians, votes ON voters.id = votes.voterId AND politicians.id = votes.politicianID
        WHERE politicians.name = '${policianName}'`
    
        db.all(whoVote, (err,rows) => {
            if(err) {
                View.showError(err)
            }else{
                View.show(rows)
            }
        }) 
    }
}

module.exports = Controller
