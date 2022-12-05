const axios = require("axios");
const {apiUrl, Recipe, Diet} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;


module.exports = {
    getRecipesQueryParameter: function(query){},
    getRecipesForId: function(id){},
    addRecipe: function(obj){},
    getDiets: function(){}
}