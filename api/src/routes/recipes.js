const express = require('express');
const { getDataApi, getRecipesForId, getDataDb, createdRelation } = require('../controllers/controllers');
const router = express.Router();

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
        res.status(404).send({error});
    }
});

//Filtro para traer todas las recetas solamente de la DB
router.get("/db",async (req, res)=>{
    try {
        let infoDb = await getDataDb();

        if(!infoDb){
            throw new Error({error: `No existe ninguna receta en la base de datos`})
        }
        
        res.send(infoDb)
    } catch (error) {
        res.status(404).send({error});
    }
})

router.get("/:id", async (req, res)=>{
    try {
        let {id} = req.params;        
        let recipe = await getRecipesForId(id);

        res.send(recipe);
    } catch (error) {
        res.status(404).send({error});
    }
});

router.post("/", async (req, res)=>{
    try {
        await createdRelation(req.body);

        res.status(201).send({success: "La receta fue creada con exito!"});
    } catch (error) {
        res.status(404).send({error});
    }
});

module.exports = router;