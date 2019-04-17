const command = process.argv.slice(2)
const Controller = require('./controllers/controller')
if (command[0] === 'read') {
    if(command[1] === 'politicians'){
        Controller.showDataPolticians()
    }else if(command[1] === 'voters'){
        Controller.shoWDataVoters()
    }
}else if(command[0] === 'create') {
    if(command[1] === 'politicians'){
        console.log(command.slice(2));
        Controller.createPoliticians(command.slice(2))

    }

}else if(command[0] === 'update'){
    if(command[1] === 'politicians'){
        Controller.updatePoliticians(command.slice(2, 4), command.slice(4))

    }

}