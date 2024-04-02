const database = require('../../DBConfig')

// Create a user
const GetBottleSizeUser = async (req, res, next) => {
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
            "SELECT * FROM bottle_size_user WHERE user_id = $1",
            [user.idUser] 
        );
        res.status(200).json({results});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

const linkBottleUser = async (req, res, next) => {
    const link = {
        idUser: Number(req.body.idUser),
        idBottle: Number(req.body.idBottle)
    };

    if (isNaN(link.idUser) || isNaN(link.idBottle) ) {
        return res
        .status(400)
        .send({ message: "L'ID du compte ou de la bouteille n'est pas un nombre valide." });
    }

    try {
        const resultLinkExist = await database.query(
            "SELECT * FROM bottle_size_user WHERE user_id = $1 AND bottle_size_id = $2 ",
            [link.idUser, link.idBottle] 
        );

        if (resultLinkExist.rows.length == 0) {
            try {
                const results = await database.query(
                    "INSERT INTO bottle_size_user (bottle_size_id, user_id) VALUES ($1, $2);",
                    [link.idBottle, link.idUser]
                );
                res.json(results);
            } catch (error) {
                console.log(error);
                res.status(500).send(error.message)
            }

        } else {
            try {
                const results = await database.query(
                "DELETE FROM bottle_size_user WHERE user_id = $1 AND bottle_size_id = $2",
                [link.idUser, link.idBottle]
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
    GetBottleSizeUser,
    linkBottleUser
};  