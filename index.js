const args = process.argv.slice(2)
const command = args[0] 
const table = args[1]
const input = args.slice(2)
const controller = require('./controller')

switch (command) {
    case 'add':
        controller.add(table,input)
        break;
    case 'update':
    controller.update(table,input)
    break;
    controller.delete(table,input)
    break;
    default:
        break;
}
/**
 * node . add <table_name> <"name"> <party> <location> <grade_current>
 * node . update <table_name> <field> <value> <field_condition> <value_condition>
 * node . delete <table_name> <field> <value>
 */