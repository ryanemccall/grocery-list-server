const { DataTypes } = require("sequelize");

const db = require("../db");

const Grocery = db.define("grocery", {
    ingredient: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    //stretch goal
    // comment: {
    //     type: DataTypes.STRING(200),
    //     allowNull: true
    // }
});

module.exports = Grocery;

