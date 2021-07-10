//we create an object with key val pairs
//basically we are importing the controller files through index.js so they can be used in app.js

module.exports = {
    groceryController: require("./groceryController"),
    userController: require("./userController"),
};