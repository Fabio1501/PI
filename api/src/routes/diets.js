const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("estoy en la ruta diets");
})


module.exports = router;