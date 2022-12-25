import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../../redux/actions";
import IconHealth from '../../assets/icon health score PI.svg'
import IconServings from '../../assets/icon servings PI.svg'
import IconTime from '../../assets/icon time PI.svg'
import './recipedetails.css'
import Nav from "../Nav/Nav";

const RecipeDetails = () => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const recipeDetails = useSelector(state => state.recipeDetails)

    useEffect(()=>{
        dispatch(getRecipeDetails(id))
        stringToHtml(recipeDetails.dishSummary)
        console.log(recipeDetails, id, typeof recipeDetails.ingredients);
    }, [recipeDetails])
    
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
                    <img src={recipeDetails.img}/>
                    <div className="container-info">
                        <div className="icons icon-health">
                            <img src={IconHealth}/>
                            <div className="text-info">
                                <p>Health score</p>
                                <h4>{recipeDetails.healthScore}</h4>
                            </div>
                        </div>
                        <div className="icons icon-ready">
                            <img src={IconTime}/>
                            <div className="text-info">
                                <p>Ready in minutes</p>
                                <h4>{recipeDetails.readyInMinutes}</h4>
                            </div>
                        </div>
                        <div className="icons icon-servings">
                            <img src={IconServings}/>
                            <div className="text-info">
                                <p>Servings</p>
                                <h4>{recipeDetails.servings}</h4>
                            </div>
                        </div>
                        <div className="dishSummary">
                        </div>
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
                        <ul>
                            
                        </ul>
                    </div>
                    <div className="ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RecipeDetails;