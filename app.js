const args = process.argv.slice(2)
const Controller = require('./controllers/controller')
let command = args[0]
let table = ''
let values = args.slice(1)
let condition = ''

if(args[0].split(":").length > 1) {
    command = args[0].split(":")[0].toLowerCase()
    table = args[0].split(":")[1]
}

switch(command) {
    case "insert":
        Controller.insert(table, values)
        break
    case "update":
        condition = values[0]
        values = values.slice(1)
        Controller.update(table, condition, values)
        break
    case "delete":
        condition = values[0]
        values = values.slice(1)
        Controller.delete(table, condition, values)
        break
    case "inParty":
        Controller.inParty(args.slice(1))
        break
    case "count":
        Controller.count(args.slice(1))
        break
    case "countByNameLike":
        Controller.countByNameLike(args.slice(1))
        break
    case "bigThree":
        Controller.bigThree()
        break
    case "whoVote":
        Controller.whoVote(args.slice(1))
        break
}