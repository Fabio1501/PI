import axios from 'axios';
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import loader from '../../assets/loader food.gif';
import errorReceta from '../../assets/error-recetas.webp'
import IconHealth from '../../assets/IconHealth'
import IconServings from '../../assets/IconServings'
import IconTime from '../../assets/IconTime'
import './recipedetails.css'

export const getRecipeDetails = async (id) => {
    let recipes = await axios(`/recipes/${id}`);

    if (String(Number(id)) === 'NaN') recipes = await recipes.data[0];
    else{
        recipes = await recipes.data
    }

    return recipes;
}

const RecipeDetails = () => {
    let {id} = useParams();
    const [recipeDetails, setRecipeDetails] = useState({});

    useEffect(()=>{
        getRecipeDetails(id).then(res => {
            setRecipeDetails(res);
        })

        return () => {
            setRecipeDetails({});
        }
    }, [])
    
    useEffect(()=>{
        if (Object.keys(recipeDetails).length > 0) {
            stringToHtml(recipeDetails.dishSummary);
        }
    }, [recipeDetails])

    function stringToHtml(str){
        var $dishSummary = document.querySelector('.dishSummary');
        $dishSummary.innerHTML = str;
        return $dishSummary
    }

    return(
        <div className="container-pageDetails">
            <Nav/>
            {!Object.keys(recipeDetails).length ? 
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
                <div className="recipe-details-container">
                <div className="container-img-info">
                    <div className="container-img-icons">
                        <img alt="imgRecipe" className="img-prin" src={recipeDetails.img}/>
                        <div className="container-icons">
                                <div className="icons icon-health">
                                    <IconHealth/>
                                    <div className="text-info">
                                        <p>Health score</p>
                                        <h4>{recipeDetails.healthScore}</h4>
                                    </div>
                                </div>
                                <div className="icons icon-ready">
                                    <IconTime/>
                                    <div className="text-info">
                                        <p>Ready in minutes</p>
                                        <h4>{recipeDetails.readyInMinutes}</h4>
                                    </div>
                                </div>
                                <div className="icons icon-servings">
                                    <IconServings/>
                                    <div className="text-info">
                                        <p>Servings</p>
                                        <h4>{recipeDetails.servings}</h4>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="container-info">
                        <h2 className="title">{recipeDetails.name}</h2>
                        <div className="dishSummary">
                        </div>
                        <h4 className="title-diets">Diets associates at recipes</h4>
                        <div className="container-diets">
                            {
                                !recipeDetails.diets && !recipeDetails.Diets ?
                                <h3>There are no diets associated with the recipe {recipeDetails.name}</h3> :
                                !recipeDetails.diets ? 
                                recipeDetails.Diets.map(diet=>{
                                    return (
                                        <div 
                                        key={diet.name} 
                                        className="diet-details">
                                            {diet.name}
                                        </div>
                                    )
                                }) :
                                recipeDetails.diets.map(diet=>{
                                    return (
                                        <div 
                                        key={diet} 
                                        className="diet-details">
                                            {diet}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="steps-ingredients">
                    <div className="steps">
                        <h3>Step by step</h3>
                        <ol>
                            {
                                !recipeDetails.stepAStep ?
                                <p className="not-found">There is not step by step for this recipe
                                </p>:
                                typeof recipeDetails.stepAStep === 'string' ? 
                                recipeDetails.stepAStep.split(',').map(step => {
                                    return(
                                        <li key={step}>
                                            {step}
                                        </li>
                                    )
                                }):
                                recipeDetails.stepAStep.map(step => {
                                    return(
                                        <li key={step}>
                                            {step}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                    <div className="ingredients">
                        <h3>Ingredients</h3>
                        <ol>
                            {
                                !recipeDetails.ingredients ?
                                <p className="not-found">There are not ingredients for this recipe</p>:
                                typeof recipeDetails.ingredients === 'string' ?
                                recipeDetails.ingredients.split(',').map(ingredient => {
                                    return (
                                            <li key={ingredient}>
                                                {ingredient}
                                            </li>
                                        )                                    
                                    })
                                :
                                recipeDetails.ingredients.map(ingredient => {
                                    return ingredient.map(ing=>{
                                        return(
                                            <li key={ing}>
                                                {ing}
                                            </li>
                                        )                                        
                                    })
                                })
                            }
                        </ol>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

export default RecipeDetails;