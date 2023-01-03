import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions/index';
import Nav from '../Nav/Nav';
import SecundaryNav from '../SecundaryNav/SecundaryNav';
import Paginate from "../Paginate/Paginate";
import RecipeCard from "../RecipeCard/RecipeCard";
import loader from '../../assets/loader food.gif';
import errorReceta from '../../assets/error-recetas.webp'
import './recipes.css';

const Recipes = () => {
    const recipesPerPage = 9;
    const recipesFilter = useSelector(state => state.recipesFilter);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllRecipes());
    }, []);

    useEffect(()=>{
        if (!recipesFilter.length){
            loading();
        }
    }, [recipesFilter]);

    useEffect(()=>{
        let $prevBtn = document.querySelector('button[name="prev"]');
        let $nextBtn = document.querySelector('button[name="next"]');
        console.log(currentPage);
        
        if (currentPage === 1) {
            $prevBtn.setAttribute("disabled", true);
            $prevBtn.classList.add("disabled-btn");
        }else{
            if ($prevBtn.classList.contains("disabled-btn")) {
                $prevBtn.removeAttribute("disabled");
                $prevBtn.classList.remove("disabled-btn");
            }
        }
        
        if (currentPage === Math.ceil(recipesFilter.length/recipesPerPage)) {
            $nextBtn.setAttribute("disabled", true);
            $nextBtn.classList.add("disabled-btn");
        }else{
            if ($nextBtn.classList.contains("disabled-btn")) {
                $nextBtn.removeAttribute("disabled");
                $nextBtn.classList.remove("disabled-btn");
            }
        }

        let $btns = document.querySelectorAll(".btn-pages");

        for (const btn of $btns) {
            if (btn.id == currentPage) {
                btn.classList.add("btn-current");
            }else{
                if (btn.classList.contains("btn-current")) {
                    btn.classList.remove("btn-current");
                }
            }
        }
    }, [currentPage])
    
    const indexLastRecipes = currentPage * recipesPerPage;
    const indexFirstRecipes = indexLastRecipes - recipesPerPage;
    const currentRecipes = recipesFilter.slice(indexFirstRecipes, indexLastRecipes);
    function paginate(pageNumber){
        setCurrentPage(pageNumber);
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

    function handleBtn(e){
        console.log(currentPage);
        if (e.target.name === "prev") {
            setCurrentPage(currentPage - 1);
        }else{
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="recipes-container scrollbar" id="style-3">
            <Nav setCurrentPage = {setCurrentPage}/>
            <div className="cards-container">
                {   
                !currentRecipes.length ? 
                <div className="loader-error">
                    <img alt="img-loader" className="loader visible" src={loader}/>
                    <div className="error none">
                        <img alt="img-error" src={errorReceta}/>
                        <div className="text-error">
                            <h3>ERROR 404: NOT FOUND</h3>
                            <p>SORRY! We couldn't find your recipe/s 😔</p>
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
                    <button 
                    name="prev"
                    className="btn-arrows btn-prev disabled-btn" 
                    onClick={handleBtn}>🡠</button>
                    <Paginate 
                    recipesPerPage={recipesPerPage} 
                    totalRecipes = {recipesFilter.length} 
                    paginate = {paginate}/>
                    <button 
                    name="next"
                    className="btn-arrows btn-next" 
                    onClick={handleBtn}>🡢</button>
                </div>
            </div>
            <SecundaryNav setCurrentPage = {setCurrentPage}/>
        </div>
    )
}

export default Recipes; 