import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { getAllDiets } from "../../redux/actions";
import './recipecreate.css';
import './checkbox.css';

const RecipeCreate = () => {
    const [recipes, setRecipes] = useState({
        name: '',
        summary: '',
        image: '',
        ready: 0,
        servings: 0,
        health: 0,
        range: 0,
        steps: [],
        diets: [],
        ingredients: []
    });
    const [errors, setErrors] = useState({});
    const diets = useSelector(state=>state.diets)
    const dispatch = useDispatch();

    function handleClick(e){
        [e.target.name].push(e.target.value);
        setRecipes({...recipes, [e.target.name] : [e.target.name]})
    }

    function validationErrors(recipes){
        let errors = {};

    if (!recipes.name) {
        errors.name = 'Please, enter your name...'   
    }

    if (recipes.name < 5) {
        errors.name = 'The minimum number of characters is 5'   
    }

    if (recipes.name.length >= 50) {
        errors.name = 'The maximum number of characters is 50'
    }

    if (!recipes.summary) {
        errors.summary = 'Please, enter the recipe summary'
    }

    if (!recipes.health) {
        errors.health = 'Please, enter the health score'
    }

    return errors;
    }

    function handleChange(e){
        setRecipes({...recipes, [e.target.name] : e.target.value})
        setErrors(validationErrors(
            {...recipes, [e.target.name]: e.target.value}))
    }

    function handleView(){}

    function handleSubmit(e){
        e.preventDefault();
        if (!Object.entries(errors).length) {
            dispatch();
        }
    }

    useEffect(()=>{
        dispatch(getAllDiets());
    }, [])

    return(
        <div>
            <Nav/>
            <div className="bgd-image scrollbar" id="style-3">
                <div className="bgd-black-color">
                    <form className="create-recipe" onSubmit={handleSubmit}>
                        <div className="inputs-textarea">
                            <div className="inputs-texts">
                                <div className="inputs name">
                                    <label>Name: </label>
                                    <input required onChange={handleChange} value={recipes.name} name="name" type='text'/>
                                </div>
                                <div className="inputs summary">
                                    <label>Summary: </label>
                                    <input required onChange={handleChange} value={recipes.summary} name="summary" type='text'/>
                                </div>
                                <div className="inputs image">
                                    <label>Image: </label>
                                    <input onChange={handleChange} value={recipes.image} name="image" type='text' placeholder="Insert URL"/>
                                </div>
                                <div className="inputs ready">
                                    <label>Ready in minutes: </label>
                                    <input onChange={handleChange} value={recipes.ready} name="ready" type='number'/>
                                </div>
                                <div className="inputs servings">
                                    <label>Servings: </label>
                                    <input onChange={handleChange} value={recipes.servings} name="servings" type='number'/>
                                </div>
                                <div className="inputs health">
                                    <label>Health score: </label>
                                    <div className="input-range">
                                        <input
                                        required
                                        onChange={handleChange}
                                        value={recipes.range} 
                                        name="health"
                                        type='range'/>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                            <div className="steps">
                                <h3>Step a step</h3>
                                <input 
                                value={recipes.steps}
                                name='steps'
                                type='text'
                                onChange={handleChange}/>
                                <div className="btns">
                                    <button onClick={handleClick}>ADD STEP</button>
                                    <button onClick={handleView}>VIEW STEPS</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Ingredients</h3>
                            <input 
                            type='text'
                            value={recipes.ingredients}
                            name= 'ingredients'
                            onChange={handleChange}/>
                            <div className="btns">
                                <button onClick={handleClick}>ADD INGREDIENTS</button>
                                <button onClick={handleView}>VIEW INGREDIENTS</button>
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
                                                value='diets'
                                                name={diet.name}
                                                key={diet.id}
                                                onClick = {(e)=>handleClick(e)}
                                                />
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