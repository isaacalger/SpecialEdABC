'use strict';
module.exports = (sequelize, DataTypes) => {
  const ABC_Entry = sequelize.define('ABC_Entry', {
    student_id: DataTypes.INTEGER
  }, {});
  ABC_Entry.associate = function(models) {
    // associations can be defined here
  };
  return ABC_Entry;
};