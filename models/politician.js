class Politician {
    constructor(name,party,location,grade_current) {
        this.name = name
        this.party = party
        this.location = location
        this.grade_current = grade_current
    }

    static insert() {
        const INSERT_QUERY = `INSERT INTO politicians VALUES (?, ?, ?, ?, ?) `
        let stmt = db.prepare(INSERT_QUERY)
        values.unshift(null)

        stmt.run(values)
        stmt.finalize()
        console.log(INSERT_QUERY);
    }

    static update([row, newValue], [rowWhere, oldValue]) {
        const UPDATE_QUERY = `UPDATE politicians SET ${row} = '${newValue}' WHERE ${rowWhere} = '${oldValue}'`

        db.run(UPDATE_QUERY)
        console.log(UPDATE_QUERY);
    }

    static delete([row, value]) {
        const DELETE_QUERY = `DELETE FROM politicians WHERE ${row} = '${value}'`

        db.run(DELETE_QUERY)
        console.log(DELETE_QUERY);
    }
}

module.exports = Politician
