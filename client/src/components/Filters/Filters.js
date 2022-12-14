import React from "react";
import './filters.css';

const Filters = () => {
    return(
        <div className="filters-container">
            <select className = 'dropdown' name="recipes-all" id="recipes-all-select">
                <option value="">All</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select>
            <select className = 'dropdown' name="recipes-alphabetical" id="recipes-alphabetical-select">
                <option value="">Alphabetical</option>
                <option value="A-Z">A - Z</option>
                <option value="Z-A">Z - A</option>
            </select>
            <select className = 'dropdown' name="recipes-diets" id="recipes-diets-select">
                <option value="">Diets</option>
                <option value="gluten-free">Gluten Free</option>
                <option value="ketogenic">Ketogenic</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto-vegetarian">Lacto Vegetarian</option>
                <option value="ovo-vegetarian">Ovo Vegetarian</option>
                <option value="lacto-ovo-vegetarian">Lacto Ovo Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="pescetarian">Pescetarian</option>
                <option value="paleo">Paleo</option>
                <option value="primal">Primal</option>
                <option value="low-fodmap">Low Fodmap</option>
                <option value="whole-30">Whole 30</option>
            </select>
            <select className = 'dropdown' name="recipes-health" id="recipes-health-select">
                <option value="">Health Score</option>
                <option value="menor-mayor">Minor to major</option>
                <option value="mayor-menor">Major to minor</option>
            </select>
        </div>
    )
}

export default Filters;