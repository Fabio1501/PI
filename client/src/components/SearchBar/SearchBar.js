import React from "react";
import iconSearch from '../../assets/icon search.svg'
import './searchbar.css'

const SearchBar = () => {
    return( 
        <div className="wrap">
            <form className="search">
                <input type="text" className="searchRecipe" placeholder="Search recipes..."/>
                <button type="submit" className="searchButton">
                    <img src={iconSearch}/>
                </button>
            </form>
        </div>
    )
}

export default SearchBar;