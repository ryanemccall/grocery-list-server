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
            message: "Bravo! User successfully signed up.",
            user: User,
            sessionToken: token
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

            let passwordComparison = await bcrypt.compare(password, loggedInUser.password);
            
            if (passwordComparison) {
                let token = jwt.sign({ id: loggedInUser.id }, process.env.JWT_SECRET, { expiresIn: '14d' });
                
                res.status(200).json({
                    user: loggedInUser,
                    message: "You're logged in.  Bon Apettit.",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: "Login failed - incorrect email or password"
                })
            }
            } else {
            res.status(401).json({
                message: "Login failed - incorrect email or password"
            });
            }
    } catch (error) {
        res.status(500).json({
            message: "Oh no - we couldn't log you in."
        })
    }
});

module.exports = router; 