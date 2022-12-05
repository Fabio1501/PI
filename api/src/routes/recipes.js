const {apiUrl, Recipe, Diet} = require("../db");
let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiUrl}&addRecipeInformation=true`;
const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("hola soy la ruta recipes")
})


module.exports = router;

