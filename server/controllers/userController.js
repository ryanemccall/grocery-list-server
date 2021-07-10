const Express = require("express");
const { UserModel } = require("../models");
const User = require("../models/user");
const router = Express.Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");

//NEW USER SIGN UP
router.post('/signup', async (req, res) => {
    let { email, password } = req.body.user;
    
    try {
        const User = await UserModel.create({
            email,
            password
        });
        res.status(201).json({
            message: "Bravo! User succesfully signed up.",
            user: User
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Be more unique. Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Bummer. Failed to register user",
            });
        }
    }
});

//USER LOG IN

router.post('/login', async (req, res) => {
    
    let { email, password } = req.body.user;
    
    try {
        const loggedInUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loggedInUser) {
        res.status(200).json({
            user: loggedInUser,
            message: "You're logged in.  Bon Apettit."
        });
        } else {
            res.status(401).json({
                message: "Login failed"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Oh no - we couldn't log you in."
        })
    }
});

module.exports = router; 