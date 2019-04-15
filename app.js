const input = process.argv.slice(2)
const PoliticianControl = require('./controllers/politicianController')

switch (input[0]) {
    case 'create':
        if (input[1] === 'politician'){
            PoliticianControl.create(input.slice(2))
        }
        break;
    case 'delete':
        if(input[1] === 'politician'){
            PoliticianControl.delete(input.slice(2))
        }
        break;
    case 'update':
        if(input[1] === 'politician'){
            PoliticianControl.update(input.slice(2))
        }
        break;
    case 'show':
        if(input[1] == 1){
            PoliticianControl.showNo1(input.slice(2))
        }else if (input[1] == 2){
            PoliticianControl.showNo2()
        }else if (input[1] == 3){
            PoliticianControl.showNo3()
        }else if (input[1] == 4){
            PoliticianControl.showNo4()
        }else if (input[1] == 5){
            PoliticianControl.showNo5()
        }

    default:
        break;
}
  

