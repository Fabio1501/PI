const express = require('express');
const { getAllRecipes, getRecipesForId } = require('../controllers/controllers');
const router = express.Router();
const {Recipe, Diet} = require("../db");

router.get("/", async (req, res)=>{
    
    try {
        let {name} = req.query;       
        let infoApi = await getAllRecipes();
        let infoDb = await Recipe.findAll();
        
        if (!name) {
            res.send([...infoApi, ...infoDb])
        }else{
            let filterApi = await infoApi.filter(recipe => recipe.name === name);
            let filterDb = await Recipe.findAll({
                where: req.query
            })

            res.send([...filterApi, ...filterDb]);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/:id", async (req, res)=>{
    try {
        let {id} = req.params;
        if (String(Number(id)) === 'NaN'){
            let infoDb = await Recipe.findByPk(id);
            if (!infoDb) {
                throw new Error({error: `No existe la receta con ID: ${id}`})
            }else{
                res.send(infoDb);
            }
        }{
            let infoApi = await getRecipesForId(id);
            if (!infoApi) {
                throw new Error({error: `No existe la receta con ID: ${id}`})
            }else{
                res.send(infoApi);
            }
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post("/", async (req, res)=>{
    try {
        const {name, dishSummary, healthScore, dietsTypes} = req.body
        
        if (!name || !dishSummary || !healthScore || !dietsTypes) {
            throw new Error({error: "Faltan datos requeridos"})
        }
        
        await Recipe.create(req.body);
        res.send({success: "La receta fue creada con exito!"})
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;