const { DataTypes, DATE } = require('sequelize');
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
    img:{
      type: DataTypes.TEXT,
      defaultValue: "https://i.postimg.cc/Dy69FXBY/default-image-PI.png",
      // validate : {
      //   len: [1,10]
      // }
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    servings: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  },{
    timestamps: false
  });
};
