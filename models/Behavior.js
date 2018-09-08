'use strict';
module.exports = (sequelize, DataTypes) => {
  const behavior = sequelize.define('Behavior', {
    description: DataTypes.STRING
  }, {});
  behavior.associate = function(models) {
    // associations can be defined here
  };
  return behavior;
};