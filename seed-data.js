const fs       = require('fs')
const POLITICIANS_PATH = './politicians.csv'
const VOTERS_PATH = './voters.csv'
const VOTES_PATH = './votes.csv'
const db = require('./setup')

let politiciansData = fs.readFileSync(POLITICIANS_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)
let votersData = fs.readFileSync(VOTERS_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)
let votesData = fs.readFileSync(VOTES_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)

db.serialize(function() {
  let stmt = db.prepare(`INSERT INTO politicians(id, name, party, location, grade_current) VALUES (null, ?, ?, ?, ?)`);

  for (var i = 0; i < politiciansData.length; i++) {
      stmt.run(politiciansData[i][0], politiciansData[i][1], politiciansData[i][2], politiciansData[i][3]);
      console.log('Insert new data to politicians table');
  }
  stmt.finalize();

  stmt = db.prepare(`INSERT INTO voters(id, first_name, last_name, gender, age) VALUES (null, ?, ?, ?, ?)`);

  for (var i = 0; i < votersData.length; i++) {
    stmt.run(votersData[i][0], votersData[i][1], votersData[i][2], votersData[i][3]);
    console.log('Insert new data to voters table');
  }
  stmt.finalize();

  stmt = db.prepare(`INSERT INTO votes(id, voterId, politicianId) VALUES (null, ?, ?)`);

  for (var i = 0; i < votesData.length; i++) {
    stmt.run(votesData[i][0], votesData[i][1]);
    console.log('Insert new data to votes table');
  }

  stmt.finalize();
});
 
db.close();
