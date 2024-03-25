const database = require('../../DBConfig')

// Create a user
const GetDesignationUser = async (req, res, next) => {
    const user = {
        idUser: Number(req.body.idUser),
      };
    if (isNaN(user.idUser) ) {
        return res
        .status(400)
        .send({ message: "L'ID du compte n'est pas un nombre valide." });
    }
    try {
        const results = await database.query(
            "SELECT * FROM designation_user WHERE user_id = $1",
            [user.idUser] 
        );
        res.json(results.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

const linkDesignationUser = async (req, res, next) => {
    const link = {
        idUser: Number(req.body.idUser),
        idDesignation: Number(req.body.idDesignation)
    };

    if (isNaN(link.idUser) || isNaN(link.idDesignation) ) {
        return res
        .status(400)
        .send({ message: "L'ID du compte ou de la l'appellation n'est pas un nombre valide." });
    }

    try {
        const resultLinkExist = await database.query(
            "SELECT * FROM designation_user WHERE user_id = $1 AND designation_id = $2 ",
            [user.idUser, user.idDesignation] 
        );

        if (resultLinkExist.length == 0) {
            try {
                const results = await database.query(
                    "INSERT INTO designation_user (designation_id, user_id) VALUES ($1, $2);",
                    [link.idDesignation, link.idUser]
                );
                res.json(results);
            } catch (error) {
                console.log(error);
                res.status(500).send(error.message)
            }

        } else {
            try {
                const [results, fields] = await database.query(
                "DELETE FROM designation_user WHERE user_id = $1 AND designation_id = $2",
                [link.idUser, link.idDesignation]
                );
                res.json(results);
            } catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};


module.exports = {
    GetDesignationUser,
    linkDesignationUser
};  