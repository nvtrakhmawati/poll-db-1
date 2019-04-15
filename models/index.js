const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('polldb1.db')

class Politician {
    constructor(id, name, party, location, grade_current){
        this.id = id
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }
    static voting(politicianName, cb){
        let query = `SELECT first_name, last_name, gender, age FROM Voters
            JOIN Politicians, Votes ON Voters.id = Votes.voterId AND Politicians.id = Votes.politicianId
            WHERE Politicians.name = "${politicianName}"`
        Db.dbAll(query, cb)
    }
    static topRank(cb){
        let query = `SELECT COUNT(Votes.id) as totalVote, name, party, location FROM Politicians
                    JOIN Votes ON Politicians.id = Votes.politicianId
                    GROUP BY name
                    ORDER BY totalVote DESC
                    LIMIT 3`
        Db.dbAll(query, cb)
    }
    static count([field, value], cb){
        let query = `SELECT Politicians.name as Name, COUNT(Votes.id) as TotalVote FROM Politicians
                    JOIN Votes ON Politicians.id = Votes.politicianId
                    WHERE Politicians.${field} LIKE "${value}%" GROUP BY Politicians.name`
        Db.dbAll(query, cb)
    }
    static insert([name, party, location, grade_current], cb){
        let query = `INSERT INTO Politicians (id , name, party, location, grade_current)
                    VALUES (null , "${name}", "${party}", "${location}", ${grade_current});`
        Db.dbRun(query, cb)
    }
    static list([party, grade_current_min, grade_current_max],cb){
        let query = `SELECT * FROM Politicians
        WHERE grade_current BETWEEN ${grade_current_min} AND  ${grade_current_max} AND party = "${party}"`
        db.all(query, (err, data)=>{
            if (err) cb (err, null)
            else {
                data = data.map(data => new Politician(data.id, data.name, data.party, data.location, data.grade_current))
                cb (null, data)
            }
        })
    }
    static update([fieldTarget, valueTarget, field, value], cb){
        let query = `UPDATE Politicians
                        SET ${field} = "${value}"
                        WHERE ${fieldTarget} = "${valueTarget}"`
        Db.dbRun(query, cb)
    }
    static delete([field, value], cb){
        let query = `DELETE FROM Politicians where ${field} = "${value}";`
        Db.dbRun(query, cb)
    }
    static under9(cb){
        let query = `SELECT name, location, grade_current, COUNT(Votes.id) AS totalVote FROM Politicians
                    JOIN Votes ON Politicians.id = Votes.politicianId
                    WHERE grade_current < 9
                    GROUP BY Politicians.name
                    ORDER BY grade_current ASC`
        Db.dbAll(query, cb)
    }
    static topVote(cb){
        let query = `SELECT totalVote, PoliticianName, first_name ||" "|| last_name AS voterName, gender FROM (SELECT COUNT(Votes.id) AS totalVote, politicianId, name AS PoliticianName FROM Votes
            JOIN Politicians ON Votes.politicianId = Politicians.id
            GROUP BY PoliticianName
            ORDER BY totalVote DESC
            LIMIT 3) AS topRank
            JOIN Voters, Votes ON Voters.id = Votes.voterId AND Votes.politicianId = topRank.politicianId
            ORDER BY totalVote DESC`
        Db.dbAll(query, cb)
    }
    static cheatingVoters(cb){
        let query = `SELECT COUNT(Voters.id) AS totalVote, first_name ||" "|| last_name AS name, gender, age FROM Voters
                    JOIN Votes ON Voters.id = Votes.voterId
                    GROUP BY Voters.id
                    HAVING totalVote > 1
                    ORDER BY totalVote DESC`
        Db.dbAll(query, cb)
    }
}

class Voter {
    constructor(id, first_name, last_name, gender, age){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.gender = gender
        this.age = age
    }
    static insert([first_name, last_name, gender, age], cb){
        let query = `INSERT INTO Voters (id, first_name, last_name, gender, age)
                    VALUES (null , "${first_name}", "${last_name}", "${gender}", ${age});`
        Db.dbRun(query, cb)
    }
    static delete([field, value], cb){
        let query = `DELETE FROM Voters where ${field} = "${value}";`
        Db.dbRun(query, cb)
    }
    static update([fieldTarget, valueTarget, field, value], cb){
        let query = `UPDATE Voters
                        SET ${field} = "${value}"
                        WHERE ${fieldTarget} = "${valueTarget}"`
        Db.dbRun(query, cb)
    }
    static list(cb){
        let query = `SELECT * FROM Voters`
        db.all(query, (err, data)=>{
            if (err) cb (err, null)
            else {
                data = data.map(data => new Voter(data.id, data.first_name, data.last_name, data.gender, data.age))
                cb (null, data)
            }
        })
    }
}

class Vote {
    constructor(id, voterId, politicianId){
        this.id = id
        this.voterId = voterId
        this.politicianId = politicianId
    }
    static list(cb){
        let query = `SELECT * FROM votes`
        Db.dbAll(query, cb)
    }
    static delete([field, value], cb){
        let query = `DELETE FROM votes where ${field} = "${value}";`
        Db.dbRun(query, cb)
    }
    static update([fieldTarget, valueTarget, field, value], cb){
        let query = `UPDATE Votes
                        SET ${field} = "${value}"
                        WHERE ${fieldTarget} = "${valueTarget}"`
        Db.dbRun(query, cb)
    }
    static insert([voterId, politicianId], cb){
        let query = `INSERT INTO Votes (id, voterId, politicianId)
                    VALUES (null , "${voterId}", "${politicianId}");`
        Db.dbRun(query, cb)
    }
}

class Db{
    static dbRun(query, cb){
        db.run(query, (err)=>{
            if (err) return cb (err)
            else return cb ()
        })
    }
    static dbAll(query, cb){
        db.all(query, (err, data)=>{
            if (err) return cb (err, null)
            else return cb (null, data)
        })
    }
}
module.exports = {Politician, Voter, Vote}