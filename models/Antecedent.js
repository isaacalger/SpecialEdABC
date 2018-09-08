'use strict';
module.exports = (sequelize, DataTypes) => {
  const antecedent = sequelize.define('Antecedent', {
    description: DataTypes.STRING
  }, {});
  antecedent.associate = function(models) {
    // associations can be defined here
  };
  return antecedent;
};