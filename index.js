

const Controller = require('./controller')
let [command, table, ...parameters] = process.argv.slice(2)

switch (command) {
    case 'create':
    case 'add':
        Controller.create(table, parameters)
        break;
    case 'update':
        Controller.update(table,parameters)
        break;
    case 'delete':
        Controller.delete(table,parameters)
        break;
    case 'findby':
    case 'find':
        Controller.find(table, parameters)
        break;
    default:
        Controller.help()
}