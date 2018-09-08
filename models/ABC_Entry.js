'use strict';
module.exports = (sequelize, DataTypes) => {

  const ABC_Entry = sequelize.define('ABC_Entry', {
    StudentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    anticedent: DataTypes.ARRAY(DataTypes.INTEGER),
    consequence: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});

  ABC_Entry.associate = function(models) {
    ABC_Entry.belongsTo(models.Student);
    //ABC_Entry.belongsTo(models.User);
    ABC_Entry.hasMany(models.Behavior);
  };

  return ABC_Entry;
};