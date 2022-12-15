import axios from 'axios';
import {GET_ALL_RECIPES, GET_RECIPE_DETAILS, GET_RECIPES_DB, GET_RECIPES_API, GET_RECIPES_AZ, GET_RECIPES_ZA} from '../utils'

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