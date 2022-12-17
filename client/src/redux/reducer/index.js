import {GET_ALL_RECIPES, GET_RECIPE_DETAILS, GET_RECIPES_FILTERS, GET_ALL_DIETS} from '../utils'

const initialState = {
    recipes: [],
    recipesDetails: [],
    diets: []
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
    
        case GET_RECIPES_FILTERS:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_ALL_DIETS:
            return{
                ...state,
                diets: action.payload
            }    
        default:
            return state;
    }
}

export default rootReducer;