import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { pageForArrows, pageForPaginate } from "../../redux/actions";
import './paginate.css';

const Paginate = ({recipesPerPage, totalRecipes, paginate}) => {
    // const dispatch = useDispatch();
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    }
    // let nroPages = Math.ceil(recipes.length / 9);
    // const cantPages = [];
    // let nroPages = 12;

    // for (let i = 0; i < nroPages; i++) {
    //     cantPages.push(i);
    // }
    // useEffect(()=>{
    //     addRecipesByPage();
    // }, [])

    // function addRecipesByPage(){
    //     console.log(cantPages, nroPages);
    //     for (let i = 0; i < nroPages; i++) {
    //         cantPages.push(i);
    //     }
    // }

    // function handleClickPages(page, recipes){
    //     setCurrentPage(page);
    //     dispatch(pageForPaginate(page, recipes));
    // }

    // function handleClickArrows(page, recipes, target){
    //     if (target.className === 'btn-back') {
    //         setCurrentPage(page-1);
    //     }
    //     setCurrentPage(page+1);
        
    //     dispatch(pageForArrows(page, recipes));
    // }

    return(
        <div className="paginate-container">
            {/* <button className="btn-back"
            onClick={e => handleClickArrows(currentPage, recipes, e.target)}>🡨</button> */}
            {/* {   
                cantPages.map(page => {
                    return <button
                        className="btn-pages" 
                        id = {page+1}  
                        onClick={()=>handleClickPages(page, recipes)} 
                        key = {page+1}
                        >{page+1}</button>
                })
            } */}
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
            {/* <button className="btn-next"
            onClick={e => handleClickArrows(currentPage, recipes, e.target)}>🡪</button> */}
        </div>
    )
}

export default Paginate;