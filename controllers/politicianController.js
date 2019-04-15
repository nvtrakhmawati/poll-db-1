const Politician = require('../models/politician')
const View = require('../views/view')

class PoliticianControl{
    static create(input){
        Politician.add(input, (err)=>{
            if (err) View.showError(err)
            else{
                View.showMessage(`${input[0]} has been added to the database`)
            }
        })
    }

    static update(input){
        Politician.update(input, (err)=>{
            if (err)View.showError(err)
            else{
                View.showMessage(`${input[1]} of ${input[0]}(id) has been updated!`)
            }
        })
    }

    static delete(input){
        Politician.delete(Number(input[0]), (err)=>{
            if(err) View.showError(err)
            else{
                View.showMessage(`politician with the id of ${input[0]} has been deleted from the database`)
            }
        })
    }

    static showNo1(){
        Politician.rAndBetween9And11((err, list)=>{
            if (err) View.showError(err)
            else{
                View.showMessage(list)
            }
        })
    }
    
    static showNo2(){
        Politician.number2((err, list)=>{
            if(err) View.showError(err)
            else{
                View.showMessage(list)
            }
        })
    }

    static showNo3(){
        Politician.number3((err, list)=>{
            if(err)View.showError(err)
            else{
                View.showMessage(list)
            }
        })
    }
    static showNo4(){
        Politician.number4((err, list)=>{
            if(err) View.showError(err)
            else{
                View.showMessage(list)
            }
        })
    }
    static showNo5(){
        Politician.number5((err, list)=>{
            if(err) View.showError(err)
            else{
                View.showMessage(list)
            }
        })
    }

}

module.exports = PoliticianControl