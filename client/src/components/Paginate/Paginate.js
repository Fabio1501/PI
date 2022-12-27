import React from "react";
import './paginate.css';

const Paginate = ({recipesPerPage, totalRecipes, paginate}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    }


    return(
        <div className="paginate-container">
            {   
                pageNumbers.map(page => {
                    return <button
                        className="btn-pages" 
                        id = {page}  
                        onClick={()=>paginate(page)} 
                        key = {page}
                        >{page}</button>
                })
            }
        </div>
    )
}

export default Paginate;