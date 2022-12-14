import React from "react";
import defaultImg from '../../assets/default-image - PI.jpg';
import './recipecard.css';

export default class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        // this.state = { counter: 0 }
        // this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return(
            <div className="card">
                <img src={defaultImg}/>
                <h2>Title</h2>
                <div className="attributes-values">
                    <h5 className="health">Health Score:</h5>
                    <p className="value">lorem</p>
                </div>
                <div className="diet-home">
                    <h5>Diet Types:</h5>
                </div>
                <div className="diets-home">
                    <div>lacto ovo vegetarian</div>
                    <div>lacto vegetarian</div>
                    <div>ovo vegetarian</div>
                    <div>diet 1</div>
                    <div>diet 1</div>
                </div>
            </div>
        )
    }
}