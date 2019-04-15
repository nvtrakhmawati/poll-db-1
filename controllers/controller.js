const Politician = require('../models/model').Politician
const Voter = require('../models/model').Voter
const Vote = require('../models/model').Vote
const View = require('../views/view')
const Tables = {
    politician: Politician,
    voter: Voter,
    vote: Vote
}

class Controller {
    static findOne(input) {
        Tables[input[0]].findOne(input.slice(1), (err, data) => {
            if (err) View.err(err)
            else View.data(data)
        })
    }

    static findAll(input) {
        Tables[input[0]].findAll(input.slice(1), (err, data) => {
            if (err) View.err(err)
            else View.data(data)
        })
    }

    static create(input) {
        Tables[input[0]].create(input.slice(1), err => {
            if (err) View.err(err)
            else View.data(`Sucessfully created ${input[0]} ${input[1]}`)
        })
    }

    static update(input) {
        Tables[input[0]].update(input.slice(1), err => {
            if (err) View.err(err)
            else View.data(`Sucessfully updated ${input[0]} ${input[1]}`)
        })
    }

    static delete(input) {
        Tables[input[0]].delete(input.slice(1), err => {
            if (err) View.err(err)
            else View.data(`Sucessfully deleted ${input[1]} ${input[2]}`)
        })
    }
}
module.exports = Controller