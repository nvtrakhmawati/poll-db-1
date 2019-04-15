class View{

    static help(){
        console.log(
            `
            ============================================================ POLL DB 1 =============================================================
            node index.js addPolitician <name> <party> <location> <grade_current>                   : add new politician
            node index.js listPolitician                                                            : list all politician
            node index.js updatePolitician <searchProperty> <searchValue> <newProperty> <newValue>  : update politician
            node index.js findPolitician <searchProperty> <searchValue>                             : find politician
            node index.js deletePolitician <searchProperty> <searchValue>                           : delete politician
            node index.js countVotes <name>                                                         : count politician votes
            node index.js viewParty <party_name>                                                    : view politician in specified party
            node index.js mostVoted                                                                 : view 3 most voted politicians
            node index.js votersWhoVote <politician_name>                                           : view voters who vote specified politicians
            `
        );
        
    }

    static display(data){
        console.log(data)
    }
    static listPoliticians(data){
        console.log(`\nLIST OF POLITICIANS\n===================`)
        for(let x=0; x<data.length; x++){
            console.log(`${x+1}. ${data[x].name}`)
        }
    }

    static listParty(party, data){
        console.log(`\nLIST OF POLITICIANS ON PARTY ${party}\n==============================`)
        for(let x=0; x<data.length; x++){
            console.log(`${x+1}. ${data[x].name}`)
        }
        console.log('')
    }
}

module.exports = View