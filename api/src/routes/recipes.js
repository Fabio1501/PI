const express = require('express');
const { getDataApi, getRecipesForId, getDataDb, createdRelation } = require('../controllers/controllers');
const router = express.Router();
const {Recipe} = require("../db");

router.get("/", async (req, res)=>{
    try {
        let {name} = req.query;       
        let infoApi = await getDataApi(name);
        let infoDb = await getDataDb(name);
        
        if(!infoApi && !infoDb){
            throw new Error({error: `No existe la receta ${name}`})
        }
        
        res.send([...infoApi, ...infoDb]);
    }
    catch (error){
        res.status(404).send(error);
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
        }else{
            let infoApi = await getRecipesForId(id);
            if (!infoApi) {
                throw new Error({error: `No existe la receta con ID: ${id}`})
            }else{
                res.send(infoApi);
            }
        }
    } catch (error) {
        res.status(404).send({error: error});
    }
});

router.post("/", async (req, res)=>{
    try {
        await createdRelation(req.body);

        res.send({success: "La receta fue creada con exito!"});
    } catch (error) {
        res.status(404).send({error: error});
    }
});

module.exports = router;