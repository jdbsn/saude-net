const express = require ("express");
const router = express.Router();

const VagaService = require("../services/VagaService");

router.post("/calculardias", async (req, res) => {
    idProfissional = req.body.idProfissional;

    res.json(await VagaService.calcularDias(idProfissional));

});

router.post("/calcularhorarios", async (req, res) => {
    var {data, idProfissional} = req.body;

    var horarios = await VagaService.calcularHorarios(data, idProfissional);
    
    res.json(horarios);
});

router.post("/vagascadastradas", async (req, res) => {
    var {idProfissional} = req.body;
    console.log(idProfissional)

    var vagas = await VagaService.acharTodos(idProfissional);
    
    res.json(vagas);
});

module.exports = router;