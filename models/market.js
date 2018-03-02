const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
const Market = sequelize.define("market", {
    id: {
        type: Sequelize.INTEGER, autoIncrement: true 
    },
    foreignKey: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    GoogleLink: {
        type: Sequelize.STRING,
    },
    products: {
        type: Sequelize.INTEGER
    },
    schedule: {
        type: Sequelize.INTEGER
    },
    ATM: {
        type: Sequelize.BOOLEAN
    },
    restroom: {
        type: Sequelize.BOOLEAN
    },
    petFriendly: {
        type: Sequelize.BOOLEAN
    },
    outdoors: {
        type: Sequelize.BOOLEAN
    },
    alcohol: {
        type: Sequelize.BOOLEAN
    }
});

// Syncs with DB
Market.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = Market;