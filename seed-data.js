let db = require('./setup.js');
let politicians = require('fs').readFileSync('./politicians.csv', 'utf8').split('\r\n');
let voters = require('fs').readFileSync('./voters.csv', 'utf8').split('\r\n');
let votes = require('fs').readFileSync('./votes.csv', 'utf8').split('\r\n');

let arrPoliticians = [];
let arrVoters = [];
let arrVotes = [];
let objPoliticians = [];
let objVoters = [];
let objVotes =[];

class Politicians {
    constructor(name, party, location, grade_current) {
        this.name = name;
        this.party = party;
        this.location = location;
        this.grade_current = grade_current;
    }
}

class Voters {
    constructor(first_name, last_name, gender, age) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this.age = age;
    }
}

class Votes {
    constructor(voterID, politicianID) {
        this.voterID = voterID;
        this.politicianID = politicianID;
    }
}

for (var i=1; i<politicians.length; i++) {
    let temp = politicians[i].split(',');
    arrPoliticians.push(temp);
}

for (var i=0; i<arrPoliticians.length-1; i++) {
    let temp2 = new Politicians(arrPoliticians[i][0], arrPoliticians[i][1], arrPoliticians[i][2], arrPoliticians[i][3]);
    objPoliticians.push(temp2);
}

for (var i=1; i<voters.length; i++) {
    let temp3 = voters[i].split(',');
    arrVoters.push(temp3);
}

for (var i=0; i<arrVoters.length-1; i++) {
    let temp4 = new Voters(arrVoters[i][0], arrVoters[i][1], arrVoters[i][2], arrVoters[i][3]);
    objVoters.push(temp4);
}

for (var i=1; i<votes.length; i++) {
    let temp5 = votes[i].split(',');
    arrVotes.push(temp5);
}

for (var i=0; i<arrVotes.length-1; i++) {
    let temp6 = new Votes(arrVotes[i][0], arrVotes[i][1]);
    objVotes.push(temp6);
}

for (var i=0; i<objPoliticians.length; i++) {
    db.run(`INSERT INTO politicians(name,  party, location, grade_current) VALUES ('${objPoliticians[i].name}', '${objPoliticians[i].party}', '${objPoliticians[i].location}', ${objPoliticians[i].grade_current})`, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

for (var i=0; i<objVoters.length; i++) {
    db.run(`INSERT INTO voters(first_name,  last_name, gender, age) VALUES ("${objVoters[i].first_name}", "${objVoters[i].last_name}", '${objVoters[i].gender}', ${objVoters[i].age})`, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

for (var i=0; i<objVotes.length; i++) {
    db.run(`INSERT INTO votes(voters_id, politicians_id) VALUES (${objVotes[i].voterID}, ${objVotes[i].politicianID})`, (err) => {
        if (err) {
            console.log(err)
        }
    })
}