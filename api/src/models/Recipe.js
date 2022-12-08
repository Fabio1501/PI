const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishSummary: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Proximamente..."
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    stepAStep: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Proximamente..."
    },
    dietsTypes: {
      type: DataTypes.TEXT,
    },
    ingredients: {
      type: DataTypes.TEXT,
      defaultValue: "Proximamente..."
    },
    equipment: {
      type: DataTypes.TEXT,
      defaultValue: "Proximamente..."
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    readyInMinutes: {
      type: DataTypes.INTEGER
    },
    servings: {
      type: DataTypes.INTEGER
    },
    ratingCount: {
      type: DataTypes.FLOAT
    }
  },{
    timestamps: false
  });
};
