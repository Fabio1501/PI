import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logoPrueba from '../../assets/0-logo(prueba).png';
import './nav.css';

export function hiddenSearch(){
    let url = window.location.href;
    let $search = document.querySelector('.wrapSearch');

    if (url === 'http://localhost:3000/recipes'){
        if ($search.classList.contains('hiddenSearch')) {
            $search.classList.remove('hiddenSearch')
        }
    }else{
        if (!$search.classList.contains('hiddenSearch')) {
            $search.classList.add('hiddenSearch');
        }
    }
}

const Nav = () => {

    useEffect(()=>{
        hiddenSearch();
    }, [])

    return(
        <div className="container-nav nav">
            <Link to = '/' className="logo"> 
                <img src={logoPrueba}/>
            </Link>
            <SearchBar />
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