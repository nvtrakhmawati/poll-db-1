let Controller = require('./controller/controller.js')
const argv = process.argv.slice(2)
const command = argv[0]
const input = argv.slice(1)

switch(command){
    case 'help'                     : Controller.help(); break;
    case 'addPolitician'            : Controller.insertPolitician(input); break;
    case 'listPolitician'           : Controller.getAll(); break;
    case 'updatePolitician'         : Controller.updatePolitician(input); break;
    case 'findPolitician'           : Controller.findPolitician(input); break;
    case 'deletePolitician'         : Controller.deletePolitician(input); break;
    case 'countVotes'               : Controller.readVotes(input); break;
    case 'viewParty'                : Controller.readParty(input); break;
    case 'mostVoted'                : Controller.readLargestVotes(); break;
    case 'votersWhoVote'            : Controller.readVoters(input); break;
}
