import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { pageForPaginate } from "../../redux/actions";
import './paginate.css';

const Paginate = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cantPages, setCantPages] = useState([])
    const recipes = useSelector(state => state.recipes);
    const dispatch = useDispatch();
    let nroPages = Math.ceil(recipes.length / 9);


    useEffect(()=>{
        addRecipesByPage();
    }, [])

    function addRecipesByPage(){
        //page 1 recipes.slice(0,9)
        //page 2 recipes.slice(9,18)
        //for(i=0; i<nroPages; i++) <button>{i++}</button>
        let recipesPerPage = []; //Array de arrays 
        // let backArrow = []; 
        // let nextArrow = [];
        // let acum = 0;
        for (let i = 1; i < nroPages+1; i++) {
            // recipesPerPage.push(recipes.slice(acum, acum + 9))
            // backArrow = backArrow.push(...recipes.slice(acum-9 > 0 ? acum-9 : 0 , acum > 0 ? acum : 0));
            // nextArrow = nextArrow.push(...recipes.slice(acum+9, acum+18))
                
            // if (i === 1) {
            //     backArrow = [];
            // }

            // if (i === nroPages ) {
            //     nextArrow = [];
            // }
            acum = acum + 9;
            recipesPerPage.push(i);
        }
        setCantPages(recipesPerPage);
    }

    return(
        <div className="paginate-container">
            <button>🡨</button>
            {   
                cantPages.map(page => {
                    return <button 
                    id = {page}  
                    onClick={dispatch(pageForPaginate(page))} 
                    key = {page}>{page}</button>
                })
            }
            <button>🡪</button>
        </div>
    )
}

export default Paginate;