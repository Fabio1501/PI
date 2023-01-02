import {GET_ALL_RECIPES, GET_RECIPES_FILTERS, GET_ALL_DIETS} from '../utils'

const initialState = {
    recipes: [],
    recipesFilter: [],
    diets: []
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesFilter: state.recipes
            }
        case GET_RECIPES_FILTERS:
            return{
                ...state,
                recipesFilter: action.payload
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