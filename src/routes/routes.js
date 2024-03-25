const express = require("express");
const router = express.Router();

const databaseControllers = require('../controllers/tableDatabase');
const userControllers = require('../controllers/user');
const bottleControllers = require('../controllers/bottleSize');
const MapDesignationControllers = require('../controllers/map');



/* Routes User */
router.post("/api/createUser", userControllers.createUser);
router.post("/api/updateUser", userControllers.updateUser);
router.delete("/api/deleteUser", userControllers.deleteUser);
router.get("/api/loginUser", userControllers.loginUser);


/* Routes BottleSize */
router.get("/api/getBottleUser", bottleControllers.GetBottleSizeUser);
router.post("/api/linkBottleUser", bottleControllers.linkBottleUser);

/* Routes Map designation */
router.get("/api/getDesignationUser", MapDesignationControllers.GetDesignationUser);
router.post("/api/linkDesignationUser", MapDesignationControllers.linkDesignationUser);


/* TEST ROUTES */
    /* Routes Database */
    // router.post("/api/createDB", databaseControllers.createDatabase);
    // router.delete("/api/deleteDB", databaseControllers.deleteDatabase);
    router.post("/api/insertDesignation", databaseControllers.insertDesignation);
    router.post("/api/insertBottleSize", databaseControllers.insertBottleSize);

    /* User */
    router.get("/api/getAllUser", userControllers.getAllUser);

module.exports = router;
