const {apiUrl, Recipe, Diet} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;
const express = require('express');
const router = express.Router();


router.get("/", (req, res)=>{
    res.send("estoy en la ruta diets");
})

module.exports = router;