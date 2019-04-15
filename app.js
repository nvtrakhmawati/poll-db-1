const input = process.argv.splice(2)
const Controller = require('./controllers/')

switch (input[0]){
    //Politicians
    case 'listPolitician':
        Controller.list(input.slice(1))
        break;
    case 'insertPolitician':
        Controller.insertPolitician(input.slice(1))
        break;
    case 'deletePolitician':
        Controller.deletePolitician(input.slice(1))
        break;
    case 'updatePolitician':
        Controller.updatePolitician(input.slice(1))
        break;
    case 'countPolitician':
        Controller.countPolitician(input.slice(1))
        break;
    case 'topPolitician':
        Controller.topPolitician()
        break; 
    case 'votingPolitician':
        Controller.votingPolitician(input.slice(1))
        break;
    case 'under9':
        Controller.under9()
        break;
    case 'topVote':
        Controller.topVote()
        break;
    case 'cheatingVoters':
        Controller.cheatingVoters()
        break;
    
    //Voters
    case 'listVoters':
        Controller.listVoters()
        break
    case 'insertVoter':
        Controller.insertVoter(input.slice(1))
        break;
    case 'deleteVoter':
        Controller.deleteVoter(input.slice(1))
        break;
    case 'updateVoter':
        Controller.updateVoter(input.slice(1))
        break;

    //Votes
    case 'insertVote':
        Controller.insertVote(input.slice(1))
        break;
    case 'listVotes':
        Controller.listVotes()
        break;
    case 'deleteVote':
        Controller.deleteVotes(input.slice(1))
        break;   
    case 'updateVote':
        Controller.updateVotes(input.slice(1))
        break;   
        
    default:
        Controller.help()
        break;
}