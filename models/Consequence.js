'use strict';
module.exports = (sequelize, DataTypes) => {
  const consequence = sequelize.define('Consequence', {
    description: DataTypes.STRING
  }, {});
  consequence.associate = function(models) {
    // associations can be defined here
  };
  return consequence;
};