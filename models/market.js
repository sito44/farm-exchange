
module.exports = (sequelize, DataTypes) => {
    var market = sequelize.define('market', {
        usda_id: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        GoogleLink: {
            type: DataTypes.STRING,
        },
        products: {
            type: DataTypes.INTEGER
        },
        schedule: {
            type: DataTypes.INTEGER
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

    market.associate = function (models) {
        // associations can be defined here
        // market.belongsTo(models.[other model name])
    };
    return market;
};