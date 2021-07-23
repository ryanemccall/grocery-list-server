const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const validateSession = async(req, res, next) => {
    //options is preflight msg prior to post, put, delete, get
    if (req.method == "OPTIONS") {
        //above determines if safe to send (you need a token for any of the HTTP reqs) then next moves us onto next part of reduest
        next();
    } else if (
        req.headers.authorization &&
        req.headers.authorization.includes("Bearer")
    ) {
        //if the headers include authorization and bearer then 
        //obj deconstruction of authoriazaiton and placement into var called auth
        const { authorization } = req.headers;
        console.log("authorization -->", authorization);
        //ternary syntax - returns the token if auth contains a truthy value/
        //if auth returns no truthy, then it returns undefined into the payload
        const payload = authorization ?
            //invoke the verify method which decodes the token
            //jwt.verify(token, secretofpublickey, [options, callback])
            jwt.verify(authorization.includes("Bearer") ?
                //use another ternary to return just the token from the whole string 
                authorization.split(" ")[1] :
                authorization,
                process.env.JWT_SECRET) :
            undefined;

        console.log("payload -->", payload);
        if (payload) {
            //sequelize method of findOne to look for user in our userModel where the ID of the user in the database
            //matches the id stored in token
            let foundUser = await UserModel.findOne({ where: { id: payload.id } });
            console.log("founduser-->", foundUser);
            if (foundUser) {
                console.log("request-->", req);
                //when you use dot notation on the lefthand side, you are
                //creating a new property and anything on the right is a new prop
                //this creates user and sets it to founduser
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({ message: "Not Authorized" });
            }
        } else {
            res.status(401).send({
                message: "Invalid Token"
            });
        }
    } else {
        res.status(403).send({ message: "Forbidden" });
    }
};

module.exports = validateSession;