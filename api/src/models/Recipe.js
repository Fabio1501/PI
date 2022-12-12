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
      defaultValue: 0
    },
    stepAStep: {
      type: DataTypes.TEXT,
      defaultValue: "Proximamente..."
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
      defaultValue: 'https://i.postimg.cc/Jz2YtN6P/default-image-PI.png',
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    servings: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    aggregateLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },{
    timestamps: false
  });
};
