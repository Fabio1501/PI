import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import IconSearch from "../../assets/IconSearch";
import { getAllRecipes } from '../../redux/actions/index';
import './searchbar.css'

const SearchBar = () => {
    const [nameRecipes, setNameRecipes] = useState('');
    const dispatch = useDispatch();

    return( 
        <div className="wrapSearch">
            <form 
            className="search" 
            onSubmit={(e)=>{
                e.preventDefault();
                dispatch(getAllRecipes(nameRecipes));
                setNameRecipes('');
            }}>
                <input 
                type="text" 
                className="searchRecipe" 
                placeholder="Search recipes..."
                value = {nameRecipes}
                onChange={e => setNameRecipes(e.target.value)}/>
                <button type="submit" className="searchButton">
                    <IconSearch/>
                </button>
            </form>
        </div>
    )
}

export default SearchBar;