const command = process.argv.slice(2)
const Controller = require('./controllers/controller')

switch (command[0]) {
    case `delete`:
        Controller.delete(command.slice(1))
        break;
    case `update`:
        Controller.update(command.slice(1))
        break
    case `create`:
        Controller.create(command.slice(1))
        break
    case `findOne`:
        Controller.findOne(command.slice(1))
        break;
    case `findAll`:
        Controller.findAll(command.slice(1))
        break;
    default:
        break;
}