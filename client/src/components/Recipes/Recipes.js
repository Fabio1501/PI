import React from "react";
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import './recipes.css';

const Recipes = () => {
    return (
        <div className="recipes-container">
            <Nav />
            <div className="cards-container">
                {
                    //mapeado de cards
                }
                <p>lorem ipsum si amet</p>
                <Paginate/>
            </div>
            <SecundaryNav/>
        </div>
    )
}

export default Recipes; 