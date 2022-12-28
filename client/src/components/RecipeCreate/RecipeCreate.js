import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getAllDiets } from "../../redux/actions";
import './recipecreate.css';
import './checkbox.css';

const RecipeCreate = () => {
    const [recipes, setRecipes] = useState({
        name: '',
        dishSummary: '',
        img: '',
        readyInMinutes: 0,
        servings: 0,
        healthScore: 0,
        stepAStep: [],
        diets: [],
        ingredients: []
    });
    const [view, setView] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState({
        input_steps : '',
        input_ingredients : ''
    });
    const [errors, setErrors] = useState({});
    const diets = useSelector(state=>state.diets)
    const dispatch = useDispatch();

    function handleDisabled(){
        const $button = document.querySelector('.btn-create-recipe');
        
        if (!Object.keys(errors).length && disabled === false) {
            $button.removeAttribute("disabled")
            $button.classList.remove("disabled")
        }

        if (Object.keys(errors).length > 0 && !$button.hasAttribute("disabled")) {
            $button.setAttribute("disabled", true);
            $button.classList.add("disabled");
        }
        
    }

    function handleCheckbox(e){

        if (e.target.checked) {
            recipes[e.target.name].push(e.target.value);
            setRecipes({...recipes, [e.target.name] : [e.target.name]});
        }

        let includeDiet = recipes[e.target.name].find(diet => diet === e.target.value)
        if (!e.target.checked && includeDiet !== undefined) {
            recipes[e.target.name].splice(includeDiet);
            setRecipes({...recipes, [e.target.name] : [e.target.name]});
        }

        setRecipes({...recipes});
    }

    function handleChangeBtn(e){
        setValue({...value, [e.target.name] : e.target.value });
        return e.target.value
    }

    function handleClick(e){
        e.preventDefault();
        
        if (e.target.name === 'ingredients') {
            recipes.ingredients.push(value.input_ingredients);
            setRecipes(recipes);
            setValue({
                input_steps : '',
                input_ingredients : ''
            })
        }else{
            recipes.stepAStep.push(value.input_steps);
            setRecipes(recipes);
            setValue({
                input_steps : '',
                input_ingredients : ''
            })
        }

    }

    function validationErrors(recipes){
        let errors = {};

    if (!recipes.name.length) {
        errors.name = 'Please, enter the name of recipe...'   
    }

    if (recipes.name.length > 0 && recipes.name.length < 5) {
        errors.name = 'The minimum number of characters is 5'   
    }

    if (recipes.name.length >= 50) {
        errors.name = 'The maximum number of characters is 50'
    }

    if (!recipes.dishSummary.length) {
        errors.dishSummary = 'Please, enter the recipe summary'
    }

    if (recipes.dishSummary.length > 0 && recipes.dishSummary.length < 10) {
        errors.dishSummary = 'The minimum number of characters is 10'
    }    

    return errors;
    }

    function handleChange(e){
        setDisabled(false)
        setRecipes({...recipes, [e.target.name] : e.target.value})
        setErrors(validationErrors(
            {...recipes, [e.target.name]: e.target.value}))
    }

    function handleView(e){
        e.preventDefault();
        const $containerModal = document.querySelector('.container-modal');

        $containerModal.style.display = "flex";
        setView(e.target.name);
    }

    function handleSubmit(e){
        e.preventDefault();
        const $button = document.querySelector('.btn-create-recipe');


        if (!Object.entries(errors).length) {
            dispatch(createRecipe({...recipes, ingredients: recipes.ingredients.toString(), stepAStep: recipes.stepAStep.toString()}));
            setRecipes({
                name: '',
                dishSummary: '',
                img: '',
                readyInMinutes: 0,
                servings: 0,
                healthScore: 0,
                stepAStep: [],
                diets: [],
                ingredients: []
            })
            $button.setAttribute("disabled", true);
            $button.classList.add("disabled");
        }
    }

    useEffect(()=>{
        dispatch(getAllDiets());
    }, [])
    
    useEffect(()=>{
        handleDisabled()
    }, [errors])

    return(
        <div>
            <Nav/>
            <div className="bgd-image scrollbar" id="style-3">
                <div className="bgd-black-color">
                    <form 
                    className="create-recipe" 
                    onSubmit={handleSubmit}>
                        <h2 className="title-form">Create your own recipe!</h2>
                        <div className="inputs-textarea">
                            <div className="inputs-texts">
                                <div className="inputs name">
                                    <label>Name: </label>
                                    <input 
                                    required 
                                    onChange={handleChange} 
                                    value={recipes.name} 
                                    name="name" 
                                    type='text'/>
                                </div>
                                {!!errors.name && <p className="error">{errors.name}</p>}
                                <div className="inputs summary">
                                    <label>Summary: </label>
                                    <input 
                                    required 
                                    onChange={handleChange} 
                                    value={recipes.dishSummary} 
                                    name="dishSummary" 
                                    type='text'/>
                                </div>
                                {!!errors.dishSummary && <p className="error">{errors.dishSummary}</p>}
                                <div className="inputs image">
                                    <label>Image: </label>
                                    <input 
                                    onChange={handleChange} 
                                    value={recipes.img} 
                                    name="img" 
                                    type='text' 
                                    placeholder="Insert URL"/>
                                </div>
                                <div className="inputs ready">
                                    <label>Ready in minutes: </label>
                                    <input 
                                    onChange={handleChange} 
                                    value={recipes.readyInMinutes} 
                                    name="readyInMinutes" 
                                    type='number'/>
                                </div>
                                <div className="inputs servings">
                                    <label>Servings: </label>
                                    <input 
                                    onChange={handleChange} 
                                    value={recipes.servings} 
                                    name="servings" 
                                    type='number'/>
                                </div>
                                <div className="inputs health">
                                    <label>Health score: </label>
                                    <div className="input-range">
                                        <input
                                        onChange={handleChange}
                                        value={recipes.healthScore} 
                                        name="healthScore"
                                        type="range"/>
                                        <div className="view-range">{recipes.healthScore}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="steps">
                                <h3>Step a step</h3>
                                <input 
                                value={value.input_steps}
                                name='input_steps'
                                type='text'
                                onChange={handleChangeBtn}/>
                                <div className="btns">
                                    <button 
                                    name = 'stepAStep'
                                    className="btn-create" 
                                    onClick={handleClick}>ADD STEP</button>
                                    <button
                                    name = 'stepAStep'
                                    className="btn-create" 
                                    onClick={handleView}>VIEW STEPS</button>
                                </div>
                            </div>
                        </div>
                        <div className="diets-ingredients">
                            <div className="ingredients">
                                <h3>Ingredients</h3>
                                <input
                                name="input_ingredients"
                                type='text'
                                value={value.input_ingredients}
                                onChange= {handleChangeBtn}/>
                                <div className="btns">
                                    <button 
                                    name = 'ingredients' className="btn-create" 
                                    onClick={handleClick}>ADD INGREDIENTS</button>
                                    <button 
                                    name = 'ingredients' 
                                    className="btn-create" 
                                    onClick={handleView}>VIEW INGREDIENTS</button>
                                </div>
                            </div>
                            <div className="diets">
                                <h3>{`Choose recipe diet type \n (One or more)`}</h3>
                                <div className="choose-diets">
                                {
                                    diets.map(diet => {
                                        return (
                                            <div
                                            key={diet.id} className="checkbox-wrapper"> 
                                                    <input 
                                                    type="checkbox" 
                                                    onChange={handleCheckbox} 
                                                    key={diet.name} 
                                                    value= {diet.name} 
                                                    name='diets' 
                                                    id={diet.name} />
                                                    <label
                                                    key={`${diet.name}${diet.id}`} 
                                                    >{`${diet.name.charAt(0).toUpperCase()}${diet.name.slice(1)}`}</label>
                                                </div>
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                        <button 
                        disabled
                        className="btn-create btn-create-recipe disabled"
                        type='submit'>CREATE RECIPE</button>
                        <div className="loader create-form-loader none">
                            <span>FoodApp</span>
                            <span>FoodApp</span>
                        </div>
                        <div className="create-form-response none">
                            <p>Los datos han sido enviados.</p>
                        </div>
                    </form>
                </div>
            <Modal 
            steps = {recipes.stepAStep} 
            ingredients = {recipes.ingredients}
            view = {view}
            />
            </div>
        </div>
    )
}   

export default RecipeCreate;