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
            {
                diets.map(diet => {
                    return <div className="checkbox">
                        <input 
                        type='checkbox'
                        id="checkbox"
                        name={diet.name}
                        key={diet.name}/>
                        <label for={diet.name}
                        ><span>{`${diet.name.charAt(0).toUpperCase()}${diet.name.slice(1)}`}</span></label>
                    </div>
                })
            }
            {/* <div class="container"> 
                <div class="checkbox">
                    <input type="checkbox" id="checkbox" name="" value=""/>
                    <label for="checkbox"><span>Vegan</span></label>
                </div>

                <div class="checkbox">
                    <input type="checkbox" id="checkbox2" name="" value=""/>
                    <label for="checkbox2"><span>Whole 30</span></label>
                </div>
            </div> */}
        </div>
    )
}   

export default RecipeCreate;