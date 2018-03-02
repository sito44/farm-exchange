'use strict';
module.exports = (sequelize, DataTypes) => {
  var farm = sequelize.define('farm', {
    name: DataTypes.STRING
  }, {});
  farm.associate = function(models) {
    // associations can be defined here
  };
  return farm;
};