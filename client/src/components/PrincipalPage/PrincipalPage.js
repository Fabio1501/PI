import React from "react";
import { Link } from "react-router-dom";
import './principalpage.css'

const PrincipalPage = () => {
    return (
        <div className="bg-image">
            <div className="bg-color">
                <Link to = '/recipes' className="btn-home">GO TO HOME</Link>
                <h1 className="title-pp">The healthiest food can also be the most delicious.</h1>
            </div>
        </div>
    )
}

export default PrincipalPage;