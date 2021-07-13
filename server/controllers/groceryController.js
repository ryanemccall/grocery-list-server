const Express = require("express");
const { GroceryModel } = require("../models");
const router = Express.Router();
//place validation requirement below user so they aren't locked out
let validateSession = require("../middleware/validateSession");
const Grocery = require("../models/grocery");


//SHANNONS ENDPOINTS
//hey sorry I had put these in here to test the db connection per the modules before deciding to switch to user endpoints

router.get('/list', validateSession, (req, res) => {
    res.send("test connect get lists")
});

router.post('/create', (req, res) => {
    res.send("test connect create grocery list")
});

//RYANS ENDPOINTS 
//This is the PUT/UPDATE endpoint where USERS will be able to edit their grocery list entries in the database
router.put("/update/:id", validateSession, async (req, res) => {
    const {ingredient, quantity} = req.body.grocery; 
    const query = {
        //This is to find the List that corresponds with the User
        where: {
            id: req.params.id,
            owner: req.user.id,
        },

    };

    const updateGroceryList = {
        ingredient: ingredient,
        quantity: quantity,
    };

    try {
        const update = await Grocery.update(updateGroceryList, query);
        res.status(200).json({
            message: "Grocery list has been successfully updated!",
            update,
        });
    } catch (err) {
        res.status(500).json({
            message: `Sorry, there was an error updating your grocery list: ${err}`
        })
    }
})

//This is the DELETE endpoint where USERS will be able to remove their Lists from the Database as desired
router.delete("/delete/:id", validateSession, async (req, res) => {
    const owner = req.user.id; //to find the USER
    const listId = req.params.id; //to find the corresponding LIST

    try {
        const query = {
            where: {
                id: listId,
                owner: owner
            },
        };

        await Grocery.destroy(query);
        res.status(200).json({ message: "Your grocery list has been removed"})
    } catch(err) {
        res.status(500).json(`There was an error in deleting that list ${err}`)
    }

})

module.exports = router; 