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
            let filterApi = await infoApi.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
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
        let infoApi = await getRecipesForId(req.params.id);
        let infoDb = await Recipe.findByPk(req.params.id);

        if (!infoApi && !infoDb) {
            res.status(404).send({error: "No existe la receta requerida"})
        }
        
        res.send(infoApi || infoDb);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post("/", async (req, res)=>{
    try {
        let info;
        res.send("Estoy en el post de recipes")
    } catch (error) {
        
    }
})

module.exports = router;

