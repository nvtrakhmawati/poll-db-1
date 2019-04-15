const Politicians = require('../models/politicians.js')
const View = require('../view/View.js')

class Controller{

    static help(){
        View.help()
    }

    static getAll(){
        Politicians.readAll((err, data) => {
            if(err) View.display(err)
            else{
                View.listPoliticians(data)
            }
        })
    }

    static insertPolitician(input){
        let personObj = {
            name: input[0],
            party: input[1],
            location: input[2],
            grade_current: input[3]
        }
        Politicians.create(personObj, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(data)
            }
        })
    }

    static updatePolitician(input){
        let newData = {
            searchProperty: input[0],
            searchValue: input[1],
            updateProperty: input[2],
            updateValue: input[3]
        }
        Politicians.update(newData, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(data)
            }
        })
    }

    static findPolitician(input){
        let newData = {
            searchProperty: input[0],
            searchValue: input[1]
        }
        Politicians.readOne(newData, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(data)
            }
        })
    }

    static deletePolitician(input){
        let newData = {
            property: input[0],
            value: input[1]
        }
        Politicians.delete(newData, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(data)
            }
        })
    }

    static readVotes(input){
        let name = input[0]
        Politicians.readVotes(name, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(data)
            }
        })
    }

    static readParty(input){
        let party = {
            party: input[0],
            min: Number(input[1]),
            max: Number(input[2])
        }
        Politicians.readParty(party, (err, data) => {
            if(err) View.display(err)
            else{
                View.display(JSON.stringify(data, null, 2))
            }
        })
    }

    static readLargestVotes(){
        Politicians.readLargestVotes((err, data) => {
            if(err) View.display(err)
            else{
                View.display(JSON.stringify(data, null, 2))
            }
        })
    }

    static readVoters(input){
        let name = input[0]
        Politicians.readVoters(name, (err, data) => {
            if(err) View.display(err);
            else{
                View.display(JSON.stringify(data, null, 2))
            }
        })
    }

    
}

module.exports = Controller