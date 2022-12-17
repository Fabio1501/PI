import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { filterSelect, getAllDiets } from "../../redux/actions";
import './filters.css';

const Filters = () => {
    const diets = useSelector(state => state.diets);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDiets());
        addClick();
    }, [])

    const addClick = () => {
        // const $selects = document.querySelectorAll('.filters-container select');
        // console.log('soy una node list');
        // for (let i = 0; i < $selects.length; i++) {
        //     console.log('options', i);
        //     console.log($selects[i].children);
        //     for (let j = 0; j < $selects[i].children.length; j++) {
        //         console.log('option: ', i , $selects[i].children[j]);
        //         $selects[i].children[j].addEventListener('click', e=>{
        //             console.log('estoy en options');
        //         })
        //     }
        // }
        
        document.addEventListener('change', e =>{
            if (e.target.matches('.filters-container select')){
                dispatch(filterSelect(e.target.id, e.target.value))
            }
        })
    }

    return(
        <div className="filters-container">
            <select className = 'dropdown' name="recipes-all" id="recipes-all-select">
                <option value="" className="hola">All</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select>
            <select className = 'dropdown' name="recipes-alphabetical" id="recipes-alphabetical-select">
                <option value="">Alphabetical</option>
                <option value="A-Z">A - Z</option>
                <option value="Z-A">Z - A</option>
            </select>
            <select className = 'dropdown' name="recipes-diets" id="recipes-diets-select">
                <option value="">Diets</option>
                {
                    diets.map(diet=>{
                        return <option value={diet.name}>{`${diet.name.charAt(0).toUpperCase()}${diet.name.slice(1)}`}</option>
                    })
                }
            </select>
            <select className = 'dropdown' name="recipes-health" id="recipes-health-select">
                <option value="">Health Score</option>
                <option value="menor-mayor">Minor to major</option>
                <option value="mayor-menor">Major to minor</option>
            </select>
        </div>
    )
}

export default Filters;