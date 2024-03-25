const express = require("express");
const router = express.Router();

const databaseControllers = require('../controllers/tableDatabase');
const userControllers = require('../controllers/user');
const bottleControllers = require('../controllers/bottleSize');

/* Routes Database */
router.post("/api/createDB", databaseControllers.createDatabase);
router.delete("/api/deleteDB", databaseControllers.deleteDatabase);
router.post("/api/insertBottleSize", databaseControllers.insertBottleSize);

/* Routes User */
router.post("/api/createUser", userControllers.createUser);
router.post("/api/updateUser", userControllers.updateUser);
router.delete("/api/deleteUser", userControllers.deleteUser);
router.get("/api/loginUser", userControllers.loginUser);


/* Routes BottleSize */
router.get("/api/getBottleUser", bottleControllers.GetBottleSizeUser);
router.post("/api/linkBottleSizeUser", bottleControllers.linkBottleUser);

module.exports = router;
