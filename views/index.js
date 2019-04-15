class View {
    static showTable(data){
        console.table(data)
    }
    static showData(data){
        console.log(data)
    }
    static showErr(err){
        console.log(err)
    }
    static showMsg(msg){
        console.log(msg)
    }
    static showHelp(){
        console.clear()
        console.log(`--------------------------Politicions---------------------------------------`)
        console.log(`node app.js listPolitician <party> <grade_current_min> <grade_current_max>`)
        console.log(`node app.js insertPolitician <name> <party> <location> <grade_current>`)
        console.log(`node app.js updatePolitician <id> <field> <value>`)
        console.log(`node app.js countPolitician <field> <value>`)
        console.log(`node app.js deletePolitician <field> <value>`)
        console.log(`node app.js votingPolitician <politicianName>`)
        console.log(`node app.js topPolitician`)
        console.log(`node app.js under9`)
        console.log(`node app.js topVote`)
        console.log(`node app.js cheatingVoters`)

        console.log(`--------------------------Voters---------------------------------------------`)
        console.log(`node app.js insertVoter <first_name> <last_name> <gender> <age>`)
        console.log(`node app.js listVoters`)
        console.log(`node app.js updateVoter <id> <field> <value>`)
        console.log(`node app.js deleteVoter <field> <value>`)

        console.log(`--------------------------Votes----------------------------------------------`)
        console.log(`node app.js insertVote <voterId> <politicianId>`)
        console.log(`node app.js listVotes`)
        console.log(`node app.js updateVote <id> <field> <value>`)
        console.log(`node app.js deleteVote <field> <value>`)
        console.log(`-----------------------------------------------------------------------------`)
    }
}

module.exports = View