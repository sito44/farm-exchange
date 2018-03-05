
module.exports = (sequelize, DataTypes) => {
    var Market = sequelize.define('Market', {
        usda_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        marketname: {
            type: DataTypes.STRING
        },
        Address: {
            type: DataTypes.STRING
        },
        GoogleLink: {
            type: DataTypes.STRING
        },
        Products: {
            type: DataTypes.STRING
        },
        Schedule: {
            type: DataTypes.STRING
        },
        ATM: {
            type: DataTypes.STRING
        },
        restroom: {
            type: DataTypes.STRING
        },
        petFriendly: {
            type: DataTypes.STRING
        },
        outdoors: {
            type: DataTypes.STRING
        },
        alcohol: {
            type: DataTypes.STRING
        }
    }, {});

    Market.associate = function (models) {
        // associations can be defined here
        // market.belongsTo(models.[other model name])
    };
    return Market;
};

