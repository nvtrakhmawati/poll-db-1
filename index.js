const Politician = require('./politicians')
const input = process.argv.slice(2)
const command = input[0]

switch (command){
    case 'insertPolitician':
        Politician.insert(input.slice(1))
        break;
    case 'updatePolitician':
        Politician.updateRow(input.slice(1))
        break;
    case 'deletePolitician':
        Politician.deleteRow(input.slice(1))
        break; 
}