import React from "react";
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import RecipeCard from "../RecipeCard/RecipeCard";
import './recipes.css';

const Recipes = () => {
    return (
        <div className="recipes-container">
            <Nav />
            <div className="cards-container">
                
                <RecipeCard/>
                <div className="paginate-container">
                    <Paginate/>
                </div>
            </div>
            <SecundaryNav/>
        </div>
    )
}

export default Recipes; 