const axios = require("axios");
require('dotenv').config();
const {
    API_KEY
  } = process.env;
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`;
const {Recipe, Diet} = require("../db");

async function getRecipesForIdApi(idApi){
    // url = `https://api.spoonacular.com/recipes/${idApi}/information?apiKey=${API_KEY}`
    // url = `https://api.spoonacular.com/recipes/${idApi}/information?apiKey=44a4d0c7b7564774918875cd3a176309`
    url = `https://api.spoonacular.com/recipes/${idApi}/information?apiKey=fc313782a71b424b97eac7c98322ce79`
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
            img: image,
            readyInMinutes,
            servings
    }

    if (!data) {
        return undefined;
    }

    return data;
}

module.exports = {
    getDataApi: async function(name){
        // let allDataApi = await axios(`${url}&number=100`, {
        //     headers: {"Accept-Encoding": "gzip,deflate,compress"}
        // })
        // let allDataApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=44a4d0c7b7564774918875cd3a176309&addRecipeInformation=true&number=100`, {
        //     headers: {"Accept-Encoding": "gzip,deflate,compress"}
        // })
        let allDataApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fc313782a71b424b97eac7c98322ce79&addRecipeInformation=true&number=100`, {
            headers: {"Accept-Encoding": "gzip,deflate,compress"}
        })
        allDataApi = allDataApi.data.results;

        let data = await allDataApi.map(recipe => {
            return {
                id: recipe.id,
                name: recipe.title,
                healthScore: recipe.healthScore,
                diets: recipe.diets,
                img: recipe.image,
            }
        })

        if(!name){
          return data  
        }

        let filterApi = await data.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        return filterApi;
    },
    getDataDb: async function(name){
        if (!name){
            let infoDb = await Recipe.findAll({
                include: {
                    model: Diet,
                    attributes: ["name"],
                    through: {
                        attributes: []
                    }
                }
            });
            return infoDb;
        } 
        
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
            img,
            readyInMinutes, 
            servings, 
            aggregateLikes
        } = body

        let recipeInDb = await Recipe.findOne({where: name})

        if (recipeInDb) {
            throw new Error({error: "Ya existe la receta"})
        }

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
            img,
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