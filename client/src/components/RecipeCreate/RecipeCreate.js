import React, { useEffect } from "react";
import Nav from "../Nav/Nav";
import { getAllDiets } from "../../redux/actions";
import './recipecreate.css';
import { useDispatch, useSelector } from "react-redux";

const RecipeCreate = () => {
    const diets = useSelector(state=>state.diets)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDiets());
    }, [])

    return(
        <div>
            <Nav/>
            <div className="bgd-image">
                <div className="bgd-black-color">
                    <form className="create-recipe">
                        <div className="inputs-texts">
                            <div className="texts">
                                <label>Name: </label>
                                <label>Summary: </label>
                                <label>Image: </label>
                                <label>Ready in minutes: </label>
                                <label>Servings: </label>
                                <label>Health score: </label>
                            </div>
                            <div className ='inputs'>
                                <input type='text'/>
                                <input type='text'/>
                                <input type='text' placeholder="Insert URL"/>
                                <input type='number'/>
                                <input type='number'/>
                                <div>
                                    <input 
                                    type='range'/>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Step a step</h3>
                            <textarea></textarea>
                            <div className="btns">
                                <button>ADD STEP</button>
                                <button>VIEW STEPS</button>
                            </div>
                        </div>
                        <div>
                            <h3>Ingredients</h3>
                            <textarea></textarea>
                            <div className="btns">
                                <button>ADD INGREDIENTS</button>
                                <button>VIEW INGREDIENTS</button>
                            </div>
                        </div>
                        <div>
                            <h3>{`Choose recipe diet type \n (One or more)`}</h3>
                            {
                                diets.map(diet => {
                                    return (
                                        <div className="choose-diets">
                                            <div className="checkbox">
                                                <input 
                                                type='checkbox'
                                                id="checkbox"
                                                name={diet.name}
                                                key={diet.name}/>
                                                <label for={diet.name}
                                                ><span>{`${diet.name.charAt(0).toUpperCase()}${diet.name.slice(1)}`}</span></label>
                                            </div> 
                                        </div>
                                    )
                                })
                            }
                            <input type='submit' value='Create Recipe'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}   

export default RecipeCreate;