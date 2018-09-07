'use strict';

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {});

  Student.associate = function(models) {
    // associations can be defined here
  };

  return Student;
};