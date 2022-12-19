import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getAllRecipes } from '../../redux/actions/index';
import loader from '../../assets/loader food.gif';
import errorReceta from '../../assets/error-recetas.webp'
import './recipes.css';

const Recipes = () => {
    const recipes = useSelector(state => state.recipes);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes());
        loading();
    },[])

    function loading() {
        const $loader = document.querySelector('.cards-container .loader-error .visible');
        const $error = document.querySelector('.cards-container .loader-error .none');

        setTimeout(() => {
            $loader.classList.remove("visible");
            $loader.classList.add("none");
            $error.classList.remove("none");
            $error.classList.add("visible");
        }, 7000);
    }

    return (
        <div className="recipes-container scrollbar" id="style-3">
            <Nav />
            <div className="cards-container">
                {   
                !recipes.length ? 
                <div className="loader-error">
                    <img className="loader visible" src={loader}/>
                    <div className="error none">
                        <img src={errorReceta}/>
                        <div className="text-error">
                            <h3>ERROR 404: NOT FOUND</h3>
                            <p>LO SENTIMOS! No pudimos encontrar tu receta 😔</p>
                        </div>
                    </div>
                </div>: 
                recipes.map(recipe => {
                    return <RecipeCard
                        id = {recipe.id}
                        img = {recipe.img}
                        name = {recipe.name}
                        healthScore = {recipe.healthScore}
                        diets = {!recipe.diets ? recipe.Diets.map(diet=>diet.name) : recipe.diets}
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