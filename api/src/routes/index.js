const { Router } = require('express');
const axios = require("axios");
const {apiUrl, Recipe, Diet} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;
const routeRecipes = require("./recipes")
const routeDiets = require("./diets")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

async function info(){

    let info = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=44a4d0c7b7564774918875cd3a176309&fbclid=IwAR3HLiWpD2qxmJl9ze9AtloOZSEtCprHf4OQV2is1laJiFCfZxcwarbd77A&addRecipeInformation=true`, 
        {
            headers: {"Accept-Encoding": "null"}
        }
    )

    let steps = await info.data.results.map(recipe=>{
        if(recipe.analyzedInstructions.length === 0){
            recipe.analyzedInstructions[0] = {
                name: "", 
                steps: [
                    {
                        number: "",
                        step: "",
                        ingredients: "",
                        equipment: ""
                    }
                ]
            }
        }

        return recipe.analyzedInstructions[0].steps
    }).map(steps=>steps.map(step=>step.step));
    // console.log(info.data);
    


    console.log(steps);
    // return steps;
}

async function getInfoRecipe(id){
    let urlID = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiUrl}`;
    let info = await axios(`https://api.spoonacular.com/recipes/716426/information?apiKey=44a4d0c7b7564774918875cd3a176309&fbclid=IwAR3HLiWpD2qxmJl9ze9AtloOZSEtCprHf4OQV2is1laJiFCfZxcwarbd77A`, 
        {
            headers: {"Accept-Encoding": "null"}
        }
    )
    let steps = await info.data.analyzedInstructions[0].steps.map(step=>step.step);
    return steps;
}

info()
// console.log(getInfoRecipe());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", routeRecipes);
router.use("/diets", routeDiets);

module.exports = router;
