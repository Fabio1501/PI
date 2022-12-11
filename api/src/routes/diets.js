const express = require('express');
const {Diet} = require('../db');
const router = express.Router();

router.get("/", async (req, res)=>{
    try {
        let allDiets = await Diet.findAll();

        if (!allDiets) {
            throw new Error({error: "No hay ninguna receta"})
        }
        
        res.send(allDiets);
    } catch (error) {
        res.status(404).send({error});
    }
})


module.exports = router;