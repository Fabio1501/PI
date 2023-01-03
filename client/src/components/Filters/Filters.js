import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filterAlphabetical, filterDb, filterDiets, filterHealth, getAllDiets, getAllRecipes } from "../../redux/actions";
import './filters.css';

const Filters = ({setCurrentPage}) => {
    const recipes = useSelector(state => state.recipes);
    const recipesFilter = useSelector(state => state.recipesFilter);
    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDiets());
        dispatch(getAllRecipes());
    }, []);

    useEffect(()=>{
        setCurrentPage(1);
    }, [dispatch])

    return(
        <div className="filters-container">
            <select 
            onChange={e => dispatch(filterDb(e.target.value, recipesFilter))}
            className = 'dropdown' 
            name="recipes-all" 
            id="recipes-all-select">
                <option value="ALL">All</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select>
            <select 
            className = 'dropdown' 
            name="recipes-alphabetical" 
            id="recipes-alphabetical-select"
            onChange={e => dispatch(filterAlphabetical(e.target.value, recipesFilter))}>
                <option value="">Alphabetical</option>
                <option value="A-Z">A - Z</option>
                <option value="Z-A">Z - A</option>
            </select>
            <select 
            className = 'dropdown' 
            name="recipes-diets" 
            id="recipes-diets-select"
            onChange={e => dispatch(filterDiets(e.target.value, recipes))}>
                <option value="">Diets</option>
                {
                    diets.map(diet=>{
                        return <option 
                        value={diet.name} 
                        key = {diet.name}>{`${diet.name.charAt(0).toUpperCase()}${diet.name.slice(1)}`}</option>
                    })
                }
            </select>
            <select 
            className = 'dropdown' 
            name="recipes-health"
            id="recipes-health-select"
            onChange={e => dispatch(filterHealth(e.target.value, recipesFilter))}>
                <option value="">Health Score</option>
                <option value="menor-mayor">Minor to major</option>
                <option value="mayor-menor">Major to minor</option>
            </select>
        </div>
    )
}

export default Filters;