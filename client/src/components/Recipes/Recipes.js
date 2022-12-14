import React from "react";
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import './recipes.css';
import Paginate from "../Paginate/Paginate";

const Recipes = () => {
    return (
        <div className="recipes-container">
            <Nav/>
            <SecundaryNav/>
            <div className="cards-container">
                {
                    //mapeado de cards
                }
            </div>
            <Paginate/>
        </div>
    )
}

export default Recipes; 