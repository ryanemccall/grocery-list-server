const Express = require("express");
const { GroceryModel, UserModel } = require("../models");
// const grocery = require("../models/grocery");
const router = Express.Router();
//place validation requirement below user so they aren't locked out
let validateSession = require("../middleware/validateSession");


//SHANNONS ENDPOINTS
//hey sorry I had put these in here to test the db connection per the modules before deciding to switch to user endpoints

    /*
=============================================
    GET LOGGED-IN USER's LIST
=============================================
*/
router.get('/', validateSession, async (req, res) => {
    // res.send("test connect get lists")
    const { id } = req.user;
    try {
        const groceryList = await GroceryModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(groceryList);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*======================
    CREATE LIST
======================
*/
router.post('/', validateSession, async (req, res) => {
    // res.send("test connect create grocery list")
    const { ingredient, quantity } = req.body.grocery;
    const { id } = req.user;
    const listEntry = {
        ingredient,
        quantity,
        owner_id: id
    }
    console.log(`OWNER ID: ${id}`);
    try {
        const newListEntry = await GroceryModel.create(listEntry);
        res.status(200).json(newListEntry);
    } catch (err) {
        res.status(500).json( { error: err.message } );
    }
});

//RYANS ENDPOINTS 
//PUT 
//DELETE 

module.exports = router; 