const Sequelize = require('sequelize');

//YALL WE WILL HAVE TO COMMENT IN & OUT OF THIS TO CONNECT TO OUR OWN DB EVERY TIME BUT PLZ CALL THE DB YOU CREATE "grocery-list-db" in PgAdmin4

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

// // Em J connection 
// const sequelize = new Sequelize("postgres://postgre:postgre@localhost:5432/grocery-list-db");

//Shannon connection 
// const sequelize = new Sequelize("postgres://postgres:eb6b832da9d3427dba30a45c56d23721@localhost:5432/grocery-list-db");

//Ryan connection 
// const sequelize = new Sequelize("postgres://postgres:99cb4fbb1a3c490abc4322e217f500e5@localhost:5432/grocery-list-db");

module.exports = sequelize;
