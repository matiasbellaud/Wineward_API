const database = require('../../DBConfig')

// Create a user
const createUser = async (req, res, next) => {
    console.log("test")
    const user = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.hashPassword,
      };
    try {
        const results = await database.query(
        "SELECT user_id FROM users  WHERE email=$1",
        [user.email]
        );
        if (results.rows.length != 0) {
            res.status(404).json({message: "account with this email already exist"});
        } else {
            try {
                const results2 = await database.query(
                    "INSERT INTO users (lastname, firstname,  email, password) VALUES ($1, $2, $3, $4)",
                    [user.lastname, user.firstname, user.email, user.password]
                );
                const results = await database.query(
                    "SELECT user_id FROM users  WHERE email=$1",
                    [user.email]
                );
                res.status(200).json({results2, results});
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "account not create", results})
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
};
  
// Update a user
const updateUser = async (req, res, next) => {
    const user = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.hashPassword,
    };
    try {
        const [results, fields] = await database.query(
        "UPDATE users SET lastname = $1,firstname = $2 , email = $3, password = $4 WHERE user_id = $5",
        [user.lastname, user.firstname, user.email, user.password, req.params.id]
        );
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

// Delete a user
const deleteUser = async (req, res, next) => {
    const accountId = Number(req.body.idUser);

    if (isNaN(accountId)) {
        return res
        .status(400)
        .send({ message: "L'ID du compte n'est pas un nombre valide." });
    }

    try {
        const [results, fields] = await database.query(
        "DELETE FROM users WHERE user_id = $1",
        [accountId]
        );
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const loginUser = async (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.hashPassword,
    };
    try {
        const results = await database.query(
        "SELECT user_id FROM users  WHERE email=$1 AND password=$2;",
        [user.email, user.password]
        );
        if (results.rows.length == 0) {
            res.status(404).json({message: "no account found with this infos", results});
        } else {
            res.status(200).json( {message: "account found", results});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const results = await database.query(
            "SELECT * FROM users"
        );
        res.status(200).json(results.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    getAllUser
    
};  