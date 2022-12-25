import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import iconSearch from '../../assets/icon search.svg';
import { getAllRecipes } from '../../redux/actions/index';
import './searchbar.css'

// export function hiddenSearch(){
//     let $search = document.querySelector('.search');
//     let url = window.location.href;
//     let {id} = useParams();

//     if (id || url === 'http://localhost:3000/recipes/create') {
//         $search.classList.add('hiddenSearch');
//     }

// }

const SearchBar = () => {
    const [nameRecipes, setNameRecipes] = useState('');
    const dispatch = useDispatch();

    return( 
        <div className="wrapSearch">
            <form 
            className="search" 
            onSubmit={(e)=>{
                e.preventDefault();
                dispatch(getAllRecipes(nameRecipes))
                setNameRecipes('');
            }}>
                <input 
                type="text" 
                className="searchRecipe" 
                placeholder="Search recipes..."
                value = {nameRecipes}
                onChange={e => setNameRecipes(e.target.value)}/>
                <button type="submit" className="searchButton">
                    <img src={iconSearch}/>
                </button>
            </form>
        </div>
    )
}

export default SearchBar;