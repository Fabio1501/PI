const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.ENUM(
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "lacto ovo vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low fodmap",
        "whole 30"
      )
    },
  },{
    timestamps: false
  });
};