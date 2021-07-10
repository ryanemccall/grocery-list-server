const Express = require("express");
const app = Express();
const dbConnect = require('./db');
const controllers = require("./controllers");

//this must go above any route statements bc all res must be jsonified 
app.use(Express.json());

//setting up base URLS
app.use('/grocery', controllers.groceryController);
app.use('/user', controllers.userController);

//this is structured as a promise bc sequelize is a promise based lan that communicates with database
dbConnect.authenticate()
    .then(() => dbConnect.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on port 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: server crashed. Error: ${err}`);
    });




