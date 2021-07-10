const Express = require("express");
const { GroceryModel } = require("../models");
const router = Express.Router();


//SHANNON
router.get('/list', (req, res) => {
    res.send("test get lists")
});

router.post('/create', (req, res) => {
    res.send("test to create grocery list")
});

//RYANS ENDPOINTS 
//UPDATE /PUT 
//DELETE 

module.exports = router; 