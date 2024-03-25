const database = require('../../DBConfig')

// Create a user
const createDatabase = async (req, res, next) => {
    try {
        const [results, fields] = await database.query(
            "CREATE TABLE users (user_id SERIAL , lastname VARCHAR(50) NOT NULL,firstname VARCHAR(50) NOT NULL,email VARCHAR(60) NOT NULL,password VARCHAR(300) NOT NULL,PRIMARY KEY(user_id));CREATE TABLE wine_designation (designation_id SERIAL , designation_name VARCHAR(60) NOT NULL,PRIMARY KEY(designation_id));CREATE TABLE bottle_size (bottle_size_id SERIAL , bottle_name VARCHAR(50)  NOT NULL,size VARCHAR(5)  NOT NULL,PRIMARY KEY(bottle_size_id));CREATE TABLE designation_user (designation_id INT NOT NULL, user_id INT NOT NULL,FOREIGN KEY(designation_id) REFERENCES wine_designation(designation_id)ON DELETE CASCADE,FOREIGN KEY(user_id) REFERENCES users(user_id)ON DELETE CASCADE);CREATE TABLE bottle_size_user (bottle_size_id INT NOT NULL, user_id INT NOT NULL, FOREIGN KEY(bottle_size_id) REFERENCES bottle_size(bottle_size_id) ON DELETE CASCADE , FOREIGN KEY(user_id) REFERENCES users(user_id)ON DELETE CASCADE);" 
        );
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

// Delete database
const deleteDatabase = async (req, res, next) => {

    try {
        const [results, fields] = await database.query(
        "DROP TABLE designation_user;DROP TABLE bottle_size_user;DROP TABLE users;DROP TABLE wine_designation;DROP TABLE bottle_size;"
        );
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const insertBottleSize = async (req, res, next) => {
    try {
        const results = await database.query(
            "INSERT INTO bottle_size (bottle_name, size) VALUES ('Piccolo', '0.2'),('Bouteille', '0.75'),('Magnum', '1.5'),('Jéroboam', '3'),('Réhoboam', '4.5'),('Mathusalem', '6'),('Salmanazar', '9'),('Balthazar', '12'),('Nabuchodonosor', '15'),('Melchior', '18'),('Melchisédech', '30');" 
        );
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

const insertDesignation = async (req, res, next) => {
    try {
        const results = await database.query(
            "INSERT INTO wine_designation (designation_name) VALUES ('Muscadet');" 
        );
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

  


module.exports = {
    createDatabase,
    deleteDatabase,
    insertBottleSize,
    insertDesignation
};  