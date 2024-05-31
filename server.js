const express = require('express');
const app = express();
var cors = require('cors');
app.use(express.json());
const router = require("./src/routes/routes");

const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./DBConfig')

app.use(cors());
app.use("/", router);

app.get('/', (req, res) => {
    res.send('Simple API homepage');
})

app.listen(5070, () => {
    console.log("Server running on port 5070");
})