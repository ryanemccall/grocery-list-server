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
    },
});

module.exports = Grocery;

