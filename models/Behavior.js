'use strict';
module.exports = (sequelize, DataTypes) => {
  const Behavior = sequelize.define('Behavior', {
    description: DataTypes.STRING
  }, {});

  Behavior.associate = function(models) {    
    Behavior.belongsTo(models.ABC_Entry);
  };

  return Behavior;
};