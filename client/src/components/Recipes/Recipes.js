import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import loader from '../../assets/loader food.gif';
import errorReceta from '../../assets/error-recetas.webp'
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import RecipeCard from "../RecipeCard/RecipeCard";
import { getAllRecipes } from '../../redux/actions/index';
import './recipes.css';

const Recipes = () => {
    const recipesPerPage = 9;
    const recipesGlobal = useSelector(state => state.recipes);
    const recipesLocal = recipesGlobal;
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes());
    }, []);
    
    useEffect(()=>{
        if (!recipesGlobal.length) {
            loading();
        }
    }, [recipesGlobal]);

    const indexLastRecipes = currentPage * recipesPerPage;
    const indexFirstRecipes = indexLastRecipes - recipesPerPage;
    const currentRecipes = recipesLocal.slice(indexFirstRecipes, indexLastRecipes);

    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    }

    function loading(){
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
                !currentRecipes.length ? 
                <div className="loader-error">
                    <img className="loader visible" src={loader}/>
                    <div className="error none">
                        <img src={errorReceta}/>
                        <div className="text-error">
                            <h3>ERROR 404: NOT FOUND</h3>
                            <p>LO SENTIMOS! No pudimos encontrar tu/s receta/s 😔</p>
                        </div>
                    </div>
                </div>: 
                currentRecipes.map(recipe => {
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
                    <Paginate recipesPerPage={recipesPerPage} totalRecipes = {recipesLocal.length} paginate = {paginate}/>
                </div>
            </div>
            <SecundaryNav/>
        </div>
    )
}

export default Recipes; 