const View = require('../views/view')
const Politicians = require('../models/polticians')
const Voters = require('../models/voters')

class Controller {
    static showDataPolticians(){
        Politicians.findAll(function (err, data) {
            if(err){
                View.dataFail(err)
            }else{
                View.showData(data)
            }
            
        })

    }
    static shoWDataVoters(){
        Voters.findAll(function (err, data) {
            if(err){
                View.dataFail(err)

            }else{
                View.showData(data)
            }
            
        })
    }

    static createPoliticians(data){
        Politicians.create(data[0], data[1], data[2], data[3], function (err, data) {
            if(err) View.dataFail(err)
            else View.showData('data berhasil ditambahkan')
        })

    }

    static updatePoliticians(where, update){
        Politicians.update(where, update, function (err) {
            if(err) View.dataFail(err)
            else  View.showData(`data dengan id ${where[1]} telah diupdate`)
            
            
        })

    }
}

module.exports = Controller