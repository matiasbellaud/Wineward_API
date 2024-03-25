const database = require('../../DBConfig')

// Create a user
const createUser = async (req, res, next) => {
    const user = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
      };
    try {
        const results = await database.query(
            "INSERT INTO users (lastname, firstname,  email, password) VALUES ($1, $2, $3, $4)",
            [user.lastname, user.firstname, user.email, user.password]
        );
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};
  
// Update a user
  
const updateUser = async (req, res, next) => {
    const user = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password,
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
    const accountId = Number(req.params.id);

    if (isNaN(accountId)) {
        return res
        .status(400)
        .send({ message: "L'ID du compte n'est pas un nombre valide." });
    }

    try {
        const [results, fields] = await database.query(
        "DELETE FROM users WHERE accountId = $1",
        [accountId]
        );
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const loginUser = async (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const [results, fields] = await database.query(
        "SELECT user_id FROM users  WHERE email=$1 AND password=$2;",
        [user.email, user.password]
        );
        if (results.length == 0) {
        res.send("no account at this identifiants");
        } else {
        res.json(results);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};



module.exports = {
    createUser,
    updateUser,
    deleteUser,
    loginUser
};  