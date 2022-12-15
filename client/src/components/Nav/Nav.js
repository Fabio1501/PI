import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logo from '../../assets/0000 - logo PI.png';
import './nav.css';


const Nav = () => {
    return(
        <div className="container-nav nav">
            <Link to = '/' className="logo"> 
                <img src={logo}/>
            </Link>
            <SearchBar/>
            <div className="links">
                <Link to = '/recipes' 
                    className="link link-home"
                >Home</Link>
                <Link to = '/recipes/create'  
                    className="link link-create"
                >Create Recipe</Link>
            </div>
        </div>
    )
}

export default Nav; 