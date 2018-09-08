'use strict';
module.exports = (sequelize, DataTypes) => {
  const Antecedent = sequelize.define('Antecedent', {
    description: DataTypes.STRING
  }, {});
  Antecedent.associate = function(models) {
    // associations can be defined here
  };
  return Antecedent;
};