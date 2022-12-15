import React from "react";
import { Link } from "react-router-dom";
import './recipecard.css';

export default class RecipeCard extends React.Component{
    constructor(props){
        super(props);
        // this.state = { counter: 0 }
        // this.handleClick = this.handleClick.bind(this);
    }

    render(){
        return(
            <Link className="card" to={`recipes/${this.props.id}`}>
                <img src={this.props.img} alt = {this.props.name}/>
                <h2>{this.props.name}</h2>
                <div className="attributes-values">
                    <h5 className="health">Health Score:</h5>
                    <p className="value">{this.props.healthScore}</p>
                </div>
                <div className="diet-home">
                    <h5>Diet Types:</h5>
                </div>
                <div className="diets-home">
                    {
                        this.props.diets.map(diet => {
                            return <div key={diet}>{diet}</div>
                        })
                    }
                </div>
            </Link>
        )
    }
}