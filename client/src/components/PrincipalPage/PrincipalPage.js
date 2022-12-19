import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import imagenChef from '../../assets/imagenChef.png'
import './principalpage.css';

const PrincipalPage = () => {
    return (
        <div className="bg-image">
                <img className="chef" src={imagenChef}/>
                <div className="container-intro">
                    <img src={logo}/>
                    <h1 className="title-pp">PI food - Fabian Carabajal</h1>
                    <h2 className="subtitle-pp">{`The healthiest food can also be the most delicious.`}</h2>
                    <Link to = '/recipes' className="btn-home">GO TO HOME</Link>
                </div>
        </div>
    )
}

export default PrincipalPage;