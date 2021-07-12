const Express = require("express");
const { GroceryModel } = require("../models");
const router = Express.Router();
//place validation requirement below user so they aren't locked out
let validateSession = require("../middleware/validateSession");


//SHANNONS ENDPOINTS
//hey sorry I had put these in here to test the db connection per the modules before deciding to switch to user endpoints

router.get('/list', validateSession, (req, res) => {
    res.send("test connect get lists")
});

router.post('/create', (req, res) => {
    res.send("test connect create grocery list")
});

//RYANS ENDPOINTS 
//PUT 
//DELETE 

module.exports = router; 