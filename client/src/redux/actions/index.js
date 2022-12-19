import axios from 'axios';
import {GET_ALL_RECIPES, GET_ALL_DIETS, GET_RECIPE_DETAILS, GET_RECIPES_FILTERS, GET_PAGE_RECIPES} from '../utils'

export const getAllRecipes = (name) => {
    return async (dispatch)=>{
        // let recipes = await axios('http://localhost:3001/recipes',
        // {headers: {"Accept-Encoding": "gzip,deflate,compress"}}
        // );
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
                if(recip === option) return true;
            }
        }

        for(let recip of recipe.diets){
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

export const pageForPaginate = (numberPage) => async (dispatch) => {
    
    return await dispatch({
        type: GET_PAGE_RECIPES,
        payload: cardsPerPage
    })
}