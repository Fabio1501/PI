import React from "react";
import Filters from "../Filters/Filters";
import './secundarynav.css';

const SecundaryNav = ({setCurrent}) => {
    return(
        <div className="secundary-nav secundaryNav-container">
            <h3>Filter by: </h3>
            <Filters setCurrent = {setCurrent}/>
        </div>
    )
}

export default SecundaryNav;