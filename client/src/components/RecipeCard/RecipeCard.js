import React, {Component} from "react";
import './recipecard.css'

export default class RecipeCard extends Component{
    constructor(props){
        super(props);
        this.state = { counter: 0 }
        // this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return(
            <div className="card">
                <img src={this.props}/>
                <h2>{this.props}</h2>
                <div className="attributes-values">
                    <div className="attributes">
                        <h5>Health Score:</h5>
                        <h5>Diet Types:</h5>
                    </div>
                    <div className="values">
                        <p>{this.props}</p>
                        <p>{this.props}</p>
                    </div>
                </div>
                <div className="diets">
                    {
                        //mapear diets
                        <div>{/*cada indice de dieta*/}</div>
                    }
                </div>
            </div>
        )
    }
}