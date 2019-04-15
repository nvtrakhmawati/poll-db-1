const View = require('../views/')
const Politician = require('../models/').Politician
const Voter = require('../models/').Voter
const Vote = require('../models/').Vote

class Controller {
    //Politicians
    static list([party, grade_current_min, grade_current_max]){
        Politician.list([party, grade_current_min, grade_current_max], (err, data)=>{
            if (err) View.showErr(err)
            else View.showMsg(data)
        })
    }
    static insertPolitician([name, party, location, grade_current]){
        Politician.insert([name, party, location, grade_current], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`Insert ${name} success`)
        })
    }
    static updatePolitician([fieldTarget, valueTarget, field, value]){
        Politician.update([fieldTarget, valueTarget, field, value], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`Update Politician success`)
        })
    }
    static deletePolitician([field, value]){
        Politician.delete([field, value], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`delete ${field}: ${value} success`)
        })
    }
    static countPolitician([field, value]){
        Politician.count([field, value], (err, data)=>{
            if (err) View.showErr(err)
            else View.showData(data)
        })
    }
    static topPolitician(){
        Politician.topRank((err, data)=>{
            if (err) View.showErr(err)
            else View.showData(data)
        })
    }
    static votingPolitician(politicianName){
        Politician.voting(politicianName, (err, data)=>{
            if (err) View.showErr(err)
            else View.showTable(data)
        })
    }
    static under9(){
        Politician.under9((err, data)=>{
            if (err) View.showErr(err)
            else View.showTable(data)
        })
    }
    static topVote(){
        Politician.topVote((err, data)=>{
            if (err) View.showErr(err)
            else View.showTable(data)
        })
    }
    static cheatingVoters(){
        Politician.cheatingVoters((err, data)=>{
            if (err) View.showErr(err)
            else View.showTable(data)
        })
    }
    //Voters
    static listVoters(){
        Voter.list((err, data)=>{
            if (err) View.showErr(err)
            else View.showMsg(data)
        })
    }
    static updateVoter([fieldTarget, valueTarget, field, value]){
        Voter.update([fieldTarget, valueTarget, field, value], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`update Voter success`)
        })
    }
    static insertVoter([first_name, last_name, gender, age]){
        Voter.insert([first_name, last_name, gender, age], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`Insert ${first_name} success`)
        })
    }
    static deleteVoter([field, value]){
        Voter.delete([field, value], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`delete ${field}: ${value} success`)
        })
    }
    //Votes
    static listVotes(){
        Vote.list((err, data)=>{
            if (err) View.showErr(err)
            else View.showTable(data)
        })
    }
    static deleteVotes([field, value]){
        Vote.delete([field, value], (err) =>{
            if (err) View.showErr (err)
            else View.showMsg(`delete ${field}: ${value} success`)
        })
    }
    static updateVotes([fieldTarget, valueTarget, field, value]){
        Vote.update([fieldTarget, valueTarget, field, value], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`update Voter success`)
        })
    }
    static insertVote([voterId, politicianId]){
        Vote.insert([voterId, politicianId], (err)=>{
            if (err) View.showErr(err)
            else View.showMsg(`Insert success`)
        })
    }

    static help(){
        View.showHelp()
    }
}

module.exports = Controller