const axios = require("axios");
const {apiUrl} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;


module.exports = {
    getAllRecipes: async function(){
        let allDataApi = await axios(url, {
            headers: {"Accept-Encoding": "gzip,deflate,compress"}
        })
        allDataApi = allDataApi.data.results;

        let data = await allDataApi.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.title,
                dishSummary: recipe.summary,
                healthScore: recipe.healthScore,
                stepAStep: recipe.analyzedInstructions[0]?.steps.map(step=>step.step),
                ingredients: recipe.analyzedInstructions[0]?.steps.map(step=>step.ingredients),
                equipment: recipe.analyzedInstructions[0]?.steps.map(step=>step.equipment),
                dietsTypes: recipe.diets,
                img: recipe.image,
                readyInMinutes: recipe.readyInMinutes,
                servings: recipe.servings,
                ratingCount: recipe.ratingCount
            }
        })

        return data;
    },
    getRecipesForId: async function(id){
        url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiUrl}`
        let infoOneRecipe = await axios(url, {
            headers: {"Accept-Encoding": "gzip,deflate,compress"}
        });
        infoOneRecipe = infoOneRecipe.data

        return infoOneRecipe;
    },
    addRecipe: async function(obj){
        
    },
    getDiets: async function(){}
}