import {GET_ALL_RECIPES, GET_RECIPE_DETAILS, GET_RECIPES_DB, GET_RECIPES_API, GET_RECIPES_AZ, GET_RECIPES_ZA} from '../utils'

const initialState = {
    recipes: [],
    recipesDetails: []
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
    
        default:
            return state;
    }
}

export default rootReducer;