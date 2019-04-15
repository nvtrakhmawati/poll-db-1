const politician = require('../model').Politician
const voter = require('../model').Voter
const vote = require('../model').Vote

class Controller {
    static add (table,input){
        if(table == 'Politicians'){
            politician.create(table,input,(err)=>{
                if(err)console.log(err)
                else console.log(`berhasil add data ke table ${table} `)
            })
        }else if(table == 'Voters'){
            voter.create(table,input,(err)=>{
                if(err)console.log(err)
                else console.log(`berhasil add data ke table ${table} `)
            })
        }else if(table == 'Votes'){
            vote.create(table,input,(err)=>{
                if(err)console.log(err)
                else console.log(`berhasil add data ke table ${table} `)
            })
        }
    }
    static update(table,input){

        if(table == 'Politicians'){
            politician.update(input,(err)=>{
                if(err) console.log(err)
                else console.log('berhasil update data')
            })
        }
    }
    static delete(table,input){
        if(table == 'Politicians'){
            politician.delete(input,(err)=>{
                if(err)console.log(err)
                else console.log('berhasil delet data')
            })
        }
    }
}   
module.exports = Controller