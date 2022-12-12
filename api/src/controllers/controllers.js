const axios = require("axios");
const {apiUrl} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;
const {Recipe, Diet} = require("../db");

async function getRecipesForIdApi(idApi){
    url = `https://api.spoonacular.com/recipes/${idApi}/information?apiKey=${apiUrl}`
    let infoOneRecipe = await axios(url, {
        headers: {"Accept-Encoding": "gzip,deflate,compress"}
    });

    let {
        id,
        title,
        summary,
        healthScore,
        analyzedInstructions,
        diets,
        image,
        readyInMinutes,
        servings,
        aggregateLikes
    } = infoOneRecipe.data;

    let data = {
            id,
            name: title,
            dishSummary: summary,
            healthScore,
            stepAStep: analyzedInstructions[0]?.steps?.map(step=>step.step),
            diets,
            ingredients: analyzedInstructions[0]?.steps?.map(step=>step.ingredients?.map(ingredient => ingredient.name)),
            equipment: analyzedInstructions[0]?.steps?.map(step=>step.equipment?.map(equipment=>equipment.name)),
            image,
            readyInMinutes,
            servings,
            aggregateLikes
    }

    if (!data) {
        return undefined;
    }

    return data;
}

module.exports = {
    getDataApi: async function(name){
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
                stepAStep: recipe.analyzedInstructions[0]?.steps?.map(step=>step.step),
                diets: recipe.diets,
                ingredients: recipe.analyzedInstructions[0]?.steps?.map(step=>step.ingredients?.map(ingredient => ingredient.name)),
                equipment: recipe.analyzedInstructions[0]?.steps?.map(step=>step.equipment?.map(equipment=>equipment.name)),
                image: recipe.image,
                readyInMinutes: recipe.readyInMinutes,
                servings: recipe.servings,
                aggregateLikes: recipe.aggregateLikes
            }
        })

        if(!name){
          return data  
        }

        let filterApi = await data.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        return filterApi;
    },
    getDataDb: async function(name){
        let infoDb = await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });
        
        if (!name) return infoDb;
        
        let filterDb = await Recipe.findAll({
            where: {name},
            include: {
                model: Diet,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            },
        })

        if(filterDb.length === 0) return undefined;

        return filterDb;
    },
    getRecipesForId: async function(id){

        if (String(Number(id)) === 'NaN'){
            let infoDb = await Recipe.findAll({
                where: {id},
                include: {
                    model: Diet,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            if (!infoDb) {
                throw new Error({error: `No existe la receta con ID: ${id}`})
            }else{
                return infoDb;
            }
        }else{
            let infoApi = await getRecipesForIdApi(id);
            if (!infoApi) {
                throw new Error({error: `No existe la receta con ID: ${id}`})
            }else{
                return infoApi;
            }
        }
    },
    postDiets: async function(){
        let diets = [
            {name: "gluten free"},
            {name: "ketogenic"},
            {name: "vegetarian"},
            {name: "lacto vegetarian"},
            {name: "ovo vegetarian"},
            {name: "lacto ovo vegetarian"},
            {name: "vegan"},
            {name: "pescetarian"},
            {name: "paleo"},
            {name: "primal"},
            {name: "low fodmap"},
            {name: "whole 30"}
        ]

        await Diet.bulkCreate(diets);
    },
    createdRelation: async function(body){
        const {
            name,
            dishSummary, 
            healthScore, 
            diets,
            stepAStep, 
            ingredients,
            equipment, 
            image,
            readyInMinutes, 
            servings, 
            aggregateLikes
        } = body

        if (!name || !dishSummary || !diets) {
            throw new Error({error: "Faltan datos requeridos"})
        }
        
        let recipeCreated = await Recipe.create({
            name, 
            dishSummary, 
            healthScore,
            stepAStep, 
            ingredients,
            equipment,
            image,
            readyInMinutes,
            servings, 
            aggregateLikes
        });

        let dietDb = await Diet.findAll({
            where: {
                name: diets
            }
        })

        recipeCreated.addDiets(dietDb); 
    }
}