import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getAllRecipes } from '../../redux/actions/index';
import './recipes.css';

const Recipes = () => {
    const recipes = useSelector(state => state.recipes);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes())
    },[])

    return (
        <div className="recipes-container">
            <Nav />
            <div className="cards-container">
                {   !recipes ? <h2>Loading</h2> : recipes.map(recipe => {
                    return <RecipeCard
                        id = {recipe.id}
                        img = {recipe.img}
                        name = {recipe.name}
                        healthScore = {recipe.healthScore}
                        diets = {recipe.diets || recipe.Diets}
                        key = {recipe.id}
                    />
                })
                }
                <div className="paginate-container">
                    <Paginate/>
                </div>
            </div>
            <SecundaryNav/>
        </div>
    )
}

export default Recipes; 