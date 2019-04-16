let input = process.argv;
let command = input[2];
let data = input.slice(3);

function insert(data) {
    db.run(`INSERT INTO `)
}

function help() {
    console.log(`
        Perintah yang dapat dilakukan:
        1. Insert:
            a. Menambah politisi    (node index.js <insert_politisi> <nama politisi> <partai> <lokasi> <grade sekarang>)
            b. Menambah pemilih     (node index.js <insert_pemilih> <nama depan> <nama belakang> <jenis kelamin> <umur>)
        2. Update
            a. Merubah value politisi   (node index.js <update_politisi> <nama politisi> <data yang mau dirubah> <data baru>)
            b. Merubah value pemilih    (node index.js <update_pemilih>  <nama pemilih> <data yang mau dirubah> <data baru>)
        3. Delete
            a. Delete value (node index.js <delete_politisi> <id politisi>)
            b. Delete value (node index.js <delete_pemilih> <id pemilih>)
    `)
}

function insert_politisi(data) {
    db.run(`INSERT INTO politicians(name, party, location, grade_current) VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}" )`)
}

function insert_pemilih(data) {
    db.run(`INSERT INTO voters(first_name, last_name, gender, age) VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}" )`)
}

function update_politisi(data) {
    db.run(`UPDATE Politicians SET Politicians.${data[1]}=${data[2]} WHERE Politicians.name = ${data[0]}`)
}

function update_politisi(data) {
    db.run(`UPDATE Voters SET Voters.${data[1]}=${data[2]} WHERE voters.name = ${data[0]}`)
}

function delete_politisi(data) {
    db.run(`DELETE FROM Politicians WHERE id = ${data[0]}`)
}

function delete_pemilih(data) {
    db.run(`DELETE FROM Voters WHERE id = ${data[0]}`)
}

switch (command) {
    case 'Insert_politisi':
        insert_politisi(data);
    break;

    case 'Insert_pemilih':
        insert_pemilih(data);
    break;
    
    case 'Update_politisi':
        update_politisi(data);
    break;

    case 'Update_pemilih':
        update_pemilih(data);
    break;

    case 'Delete':
        delete(data);
    break;

    default:
        help();
}

// RELEASE 3
/*
SELECT * FROM Politicians 
	WHERE grade_current >= 9 
    AND grade_current <= 11
    
SELECT COUNT(voters_id) 
	FROM Votes WHERE politicians_id IN 
	(SELECT Politicians(id) FROM Politicians 
    WHERE name = "Olympia Snowe")`
    
SELECT Politicians.name, count(Votes.voters_id) FROM Votes, Politicians 
	WHERE Votes.politicians_id = Politicians.id AND Politicians.name like 'Adam %'
    GROUP BY politicians_id;
    
SELECT Politicians.name, Politicians.party, Politicians.location, count(Votes.voters_id) as total
	FROM Votes, Politicians
	WHERE Votes.politicians_id = Politicians.id
	GROUP BY Politicians.name
    ORDER BY total DESC
    
SELECT first_name, last_name, gender, age 
	FROM Voters LEFT JOIN Votes ON Voters.id = Votes.id 
	LEFT JOIN Politicians ON Votes.politicians_id = Politicians.id 
    WHERE name = "Olympia Snowe"
    
*/