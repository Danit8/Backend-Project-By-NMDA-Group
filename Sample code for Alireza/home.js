const express = require('express');
const home = express.Router();
home.get('/', (req, res) => {
    res.send('Hello this is my first server and i do not know much to work with node js but i am fucking watching a like you know education package so i started this project LMAO');
});
module.exports = home;