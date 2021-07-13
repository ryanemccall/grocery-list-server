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
    //RYAN---adding owner to the grocery database so a USER can pick a certain list to update in the database and avoid changing someone elses
    owner_id: {
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

