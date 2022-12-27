import React from "react";
import CloseBtn from '../../assets/close-btn.svg'
import './modal.css'

const Modal = ({steps, ingredients, view}) => {

    function handleClose(e){
        const $containerModal = document.querySelector('.container-modal');
        
        $containerModal.style.display = "none";
    }

    return(
        <div className="container-modal">
            <div className="steps-ingredients-modal">
                <div className="title-btn-close">
                    <h3>List of {view}</h3>
                    <img
                    alt="closeModal"
                    onClick={handleClose} 
                    src={CloseBtn}/>
                </div>
                <ol>
                    {!view ? 
                    <h4>There's none {view}</h4> : 
                    view === 'ingredients' ? 
                    ingredients.map(ingredient => {
                        return(
                            <li key={ingredient}>{ingredient}</li>
                        )
                    }):
                    steps.map(step => {
                        return(
                            <li key={step}>{step}</li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default Modal; 