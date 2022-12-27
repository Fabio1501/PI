import React from "react";
// import {connect} from "react-redux";
// import { getRecipeDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import './recipecard.css';

export default class RecipeCard extends React.Component{
    
    render(){
        return(
            <Link 
            className="card" 
            to={`/recipes/${this.props.id}`}
            >
                
                <img src={this.props.img} alt = {this.props.name}/>
                <div className="value-health">
                    <p className="value">{this.props.healthScore}</p>
                </div>
                <h2>{this.props.name}</h2>
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

// export default connect(mapDispatchToProps, {getRecipeDetails})(RecipeCard);