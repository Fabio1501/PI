import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../../redux/actions";
import './recipedetails.css'

const RecipeDetails = () => {
    const dispatch = useDispatch();
    let id = useParams();
    const recipeDetails = useSelector(state => state.recipeDetails)

    useEffect(()=>{
        dispatch(getRecipeDetails(id))
    }, [])
    
    return(
        <div className="recipe-details-container">
            <div className="container-img">
                <img src/>
                <div className=""></div>
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
    )
}

export default RecipeDetails;