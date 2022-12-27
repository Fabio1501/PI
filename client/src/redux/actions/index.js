import axios from 'axios';
import {GET_ALL_RECIPES, GET_ALL_DIETS, GET_RECIPE_DETAILS, GET_RECIPES_FILTERS, CREATE_RECIPE} from '../utils'

export const getAllRecipes = (name) => {
    return async (dispatch)=>{
        if(!name){
            let recipes = await axios('http://localhost:3001/recipes');
            return await dispatch({
                type: GET_ALL_RECIPES,
                payload: recipes.data
            })
        }

        let recipes = await axios(`http://localhost:3001/recipes?name=${name}`);
            return await dispatch({
                type: GET_ALL_RECIPES,
                payload: recipes.data
            })
    }
}

export const getRecipeDetails = (id) => async (dispatch) => {
    let recipes = await axios(`http://localhost:3001/recipes/${id}`);
    console.log(recipes);
    if(recipes.ingredients && typeof recipes.ingredients === 'string'){
        recipes = {
            ...recipes, 
            ingredients: recipes.ingredients.split(','),
            stepAStep: recipes.stepAStep.split(',')
        } 
    }

    return await dispatch({
        type: GET_RECIPE_DETAILS,
        payload: recipes.data
    })
}

export const getAllDiets = () => async (dispatch) => {
    let diets = await axios('http://localhost:3001/diets');
    return await dispatch({
        type: GET_ALL_DIETS,
        payload: diets.data
    })
}

const filterDb = async (option) => {
    if (option === 'DB') {
        let recipesDb = await axios(`http://localhost:3001/recipes/db`);
        return await recipesDb.data;
    }

    let recipesApi = await axios(`http://localhost:3001/recipes/api`);
    return await recipesApi.data;
}

const filterAlphabetical = async (option, info) => {
    if (option === 'A-Z') {
        info = await info.data.sort((a,b)=>a.name.localeCompare(b.name));
        return info;
    }

    info = await info.data.sort((a,b)=>b.name.localeCompare(a.name));
    return info;
}

const filterHealth = async (option, info) => {
    if (option === 'menor-mayor') {
        info = await info.data.sort((a,b)=>a.healthScore - b.healthScore);
        return info;
    }

    info = await info.data.sort((a,b)=>b.healthScore - a.healthScore);
    return info;
}

const filterDiets = async (option, info) => {
    info = await info.data.filter((recipe) => {
        if(!recipe.diets){
            for(let recip of recipe.Diets){
                if (!recipe.diets) {
                    continue
                }
                if(recip === option) return true;
            }
        }
        console.log(recipe.diets);
        for(let recip of recipe.diets){
            if (!recipe.diets) {
                continue
            }
            if(recip === option) return true;
        }
    })

    return info;
}

export const filterSelect = (select, option) => {
    console.log(`select: ${select} \n option: ${option}`);
    return async (dispatch) => {
        let allData = await axios('http://localhost:3001/recipes')
        let info;
            switch (select){
                case 'recipes-all-select':
                    info = await filterDb(option);
                    break;
                case 'recipes-alphabetical-select':
                    info = await filterAlphabetical(option, allData);
                    break;
                case 'recipes-health-select':
                    info = await filterHealth(option, allData);
                    break;
                default:
                    info = await filterDiets(option, allData);
                    break;
            }   
        return await dispatch({
            type: GET_RECIPES_FILTERS,
            payload: info
        })
    }
} 

// export const pageForPaginate = (numberPage, recipes) => async (dispatch) => {
//     let cardsPerPage = numberPage === recipes.length ? recipes.slice(numberPage * 9, recipes.length) : recipes.slice(numberPage * 9, (numberPage * 9) + 9);
//     let $backArrow = document.querySelector('.btn-back');
//     let $nextArrow = document.querySelector('.btn-next');

//     if (numberPage == 0) {
//         $backArrow.classList.add("disabled");
//         $backArrow.setAttribute("disabled");
//     }
    

//     if (numberPage == 11) {
//         $nextArrow.classList.add("disabled");
//         $nextArrow.setAttribute("disabled");
//     }
    

//     return await dispatch({
//         type: GET_PAGE_RECIPES,
//         payload: cardsPerPage
//     })
// }

// export const pageForArrows = (numberPage, recipes) => async (dispatch) => {
//     let cardsPerPage = numberPage === recipes.length ? recipes.slice(numberPage * 9, recipes.length) : recipes.slice(numberPage * 9, (numberPage * 9) + 9);
//     let $backArrow = document.querySelector('.btn-back');
//     let $nextArrow = document.querySelector('.btn-next'); 

//     if (numberPage == 0) {
//         $backArrow.classList.add("disabled");
//         $backArrow.setAttribute("disabled");
//     }
    

//     if (numberPage == 11) {
//         $nextArrow.classList.add("disabled");
//         $nextArrow.setAttribute("disabled");
//     }

//     return await dispatch({
//         type: GET_PAGE_RECIPES,
//         payload: cardsPerPage
//     })
// }

export const createRecipe = (recipe) => async (dispatch) => {
    const $loader = document.querySelector(".create-form-loader"),
    $response = document.querySelector(".create-form-response");
    
    $loader.classList.remove("none");
    
    try {
        let response = await axios.post('http://localhost:3001/recipes', recipe);

        $loader.classList.add("none");
        $response.classList.remove("none");
        
        return await dispatch({
            type: CREATE_RECIPE,
            payload: response.data
        })
    } catch (error) {
        let message = error.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.innerHTML = `Error ${error.status}: ${message}`;
    }finally{
        setTimeout(()=>{
            $response.classList.add("none")
            $response.innerHTML = "";
        }, 3000)
    }

}