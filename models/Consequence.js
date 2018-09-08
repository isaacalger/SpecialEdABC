'use strict';
module.exports = (sequelize, DataTypes) => {
  const Consequence = sequelize.define('Consequence', {
    description: DataTypes.STRING
  }, {});
  Consequence.associate = function(models) {
    // associations can be defined here
  };
  return Consequence;
};