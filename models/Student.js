'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {});

  Student.associate = function(models) {
    Student.hasMany(models.ABC_Entry)
  };

  return Student;
};