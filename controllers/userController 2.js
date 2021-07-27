const Express = require("express");
const { UserModel } = require("../models");
const User = require("../models/user");
const router = Express.Router();
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//NEW USER SIGN UP
router.post('/signup', async (req, res) => {
    let { email, password } = req.body.user;
    
    try {
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 15),
        });
        
        let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: '14d' });
        
        res.status(201).json({
            message: "Molto bene. Let's get cookin good lookin.",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Be more unique - email already in use. Or maybe you've signed up before - try logging in.",
            });
        } else {
            res.status(500).json({
                message: "Bummer. Failed to sign up potential top chef",
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

            let passwordComparison = await bcrypt.compare(password, loggedInUser.password);
            
            if (passwordComparison) {
                let token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, { expiresIn: '14d' });
                
                res.status(200).json({
                    user: loggedInUser,
                    message: "Presto.  You're in.",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Fail.  Incorrect email or password."
                })
            }
            } else {
            res.status(401).json({
                message: "Fail.  Incorrect email or password."
            });
            }
    } catch (error) {
        res.status(500).json({
            message: "Too hot in the kitchen - sorry, we couldn't log you in."
        })
    }
});

module.exports = router; 