import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../../redux/actions";
import Nav from "../Nav/Nav";
import IconHealth from '../../assets/IconHealth'
import IconServings from '../../assets/IconServings'
import IconTime from '../../assets/IconTime'
import './recipedetails.css'

const RecipeDetails = () => {
    let {id} = useParams();
    const detailsGlobal = useSelector(state => state.recipeDetails);
    const recipeDetails = detailsGlobal;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getRecipeDetails(id))
    }, [])
    
    useEffect(()=>{
        stringToHtml(recipeDetails.dishSummary);
    }, [recipeDetails])

    // useEffect(()=>{
    //     recipeDetails = {};
    // })

    function stringToHtml(str){
        var $dishSummary = document.querySelector('.dishSummary');
        $dishSummary.innerHTML = str;
        return $dishSummary
    }

    return(
        <div className="container-pageDetails">
            <Nav/>
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
                                <h3>No hay dietas asociadas a la receta {recipeDetails.name}</h3> :
                                !recipeDetails.diets ? 
                                recipeDetails.Diets.map(diet=>{
                                    return (
                                        <div 
                                        key={diet} 
                                        className="diet-details">
                                            {diet}
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
                                </p>
                                :recipeDetails.stepAStep.map(step => {
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
                                <p className="not-found">There are not ingredients for this recipe</p>
                                :recipeDetails.ingredients.map(ingredient => {
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
        </div>
    )
}

export default RecipeDetails;