import axios from 'axios';
import {GET_ALL_RECIPES, GET_ALL_DIETS, GET_RECIPES_FILTERS} from '../utils'

export const getAllRecipes = (name) => {
    return async (dispatch)=>{
        if(!name){
            let recipes = await axios('/recipes');
            return await dispatch({
                type: GET_ALL_RECIPES,
                payload: recipes.data
            })
        }

        let recipes = await axios(`/recipes?name=${name}`);
            return await dispatch({
                type: GET_RECIPES_FILTERS,
                payload: recipes.data
            })
    }
}

export const getAllDiets = () => async (dispatch) => {
    let diets = await axios('/diets');
    return await dispatch({
        type: GET_ALL_DIETS,
        payload: diets.data
    })
}

export const filterDb = (option) => async (dispatch) =>{
    let info;
    
    if (option === 'API') {
        info = await axios(`/recipes/api`);
    }

    if (option === 'DB') {
        info = await axios(`/recipes/db`);
    }
    // console.log(info);
    return await dispatch({
                type: GET_RECIPES_FILTERS,
                payload: info.data
    })

}

export const filterAlphabetical = (option, info) => async (dispatch) => {
    // console.log(option, info);
    let data;
    if (option === 'A-Z') {
        data = await info.sort((a,b)=>a.name.localeCompare(b.name));
    }

    if(option === 'Z-A'){
        data = await info.sort((a,b)=>b.name.localeCompare(a.name));
    }
    // console.log(info);
    return await dispatch({
        type: GET_RECIPES_FILTERS,
        payload: data
    })
}

export const filterHealth = (option, info) => async (dispatch) => {
    let data;
    if (option === 'menor-mayor') {
        data = await info.sort((a,b)=>a.healthScore - b.healthScore);
    }

    if (option === 'mayor-menor') {
        data = await info.sort((a,b)=>b.healthScore - a.healthScore);
    }
    
    return await dispatch({
        type: GET_RECIPES_FILTERS,
        payload: data 
    })
}

export const filterDiets = (option, info) => async (dispatch) => {
    // console.log(option + '\n');
    // console.log(info);
    info = await info.filter((recipe) => {
        if(!recipe.diets){
            for(let recip of recipe.Diets){
                if (!recip.length || !recip.name) {
                    continue
                }
                if(recip.name === option) return true;
                return false; 
            }
        }else{
            for(let recip of recipe.diets){
                if (!recip.length) {
                    continue
                }
                if(recip === option) return true;
                return false;
            }
        }
        // console.log(recipe.diets);
    })
    // console.log(info);
    return dispatch({
        type: GET_RECIPES_FILTERS,
        payload: info
    })
}

// export const filterSelect = (select, option, recipes) => {
//     return async (dispatch) => {
//         console.log(recipes);
//         // let allData = await axios('/recipes');
//         let info;
//             switch (select){
//                 case 'recipes-all-select':
//                     info = await filterDb(option);
//                     break;
//                 case 'recipes-alphabetical-select':
//                     info = await filterAlphabetical(option, recipes);
//                     break;
//                 case 'recipes-health-select':
//                     info = await filterHealth(option, recipes);
//                     break;
//                 default:
//                     info = await filterDiets(option, recipes);
//                     break;
//             }   
//         return await dispatch({
//             type: GET_RECIPES_FILTERS,
//             payload: info
//         })
//     }
// } 

export const createRecipe = (recipe) => async () => {
    const $loader = document.querySelector(".create-form-loader"),
    $response = document.querySelector(".create-form-response");
    
    $loader.classList.remove("none");
    
    try{
        if (recipe.img === '') {
            recipe = {...recipe, img: 'https://i.postimg.cc/Dy69FXBY/default-image-PI.png'}
        }
        
        await axios.post('/recipes', recipe);
        $loader.classList.add("none");
        $response.classList.remove("none");
        
    }catch (error) {
        $loader.classList.add("none");
        $response.classList.remove("none");
        if (!error) {
            $response.innerHTML = 'An error occurred while sending, try again.';    
        }
        
        let message = error.statusText || "An error occurred while sending, try again.";
        $response.style.color = 'red'
        $response.innerHTML = `Error ${!error.status ? '404' : error.status}: ${message}`;
    }finally{
        setTimeout(()=>{
            $response.classList.add("none")
            $response.innerHTML = "";
        }, 3000)
    }

}