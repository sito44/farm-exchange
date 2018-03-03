
module.exports = (sequelize, DataTypes) => {
    var Market = sequelize.define('Market', {
        usda_id: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.BOOLEAN
        },
        restroom: {
            type: DataTypes.BOOLEAN
        },
        petFriendly: {
            type: DataTypes.BOOLEAN
        },
        outdoors: {
            type: DataTypes.BOOLEAN
        },
        alcohol: {
            type: DataTypes.BOOLEAN
        }
    }, {});

    Market.associate = function (models) {
        // associations can be defined here
        // market.belongsTo(models.[other model name])
    };
    return Market;
};

