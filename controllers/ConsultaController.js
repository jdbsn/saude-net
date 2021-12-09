const express = require("express");
const Profissional = require("../models/Profissional");
const router = express.Router();

const ConsultaService = require("../services/ConsultaService");
const ProfissionalService = require("../services/ProfissionalService");

const agendamentoAuth = require("../middlewares/auth/agendamentoAuth");
const pacienteAuth = require("../middlewares/auth/pacienteAuth");
const profissionalAuth = require("../middlewares/auth/profissionalAuth");


router.post("/consulta/agendar", agendamentoAuth, async (req, res) => {
    var idPaciente = req.session.paciente.id
    var {datepicker, hora_inicio, intervalo, idProfissional} = req.body;

    var status = await ConsultaService.criar(datepicker, hora_inicio, intervalo, idPaciente, idProfissional)

    if(status) {
        res.redirect("/paciente")
    } else {
        res.send("Falhou.")
    }
});

router.get("/profissional/:id/mostrarcalendario", profissionalAuth, async (req, res) => {
    var idProfissional = req.params.id;

    try {
        var consultasProfissional = await ConsultaService.pegarTodosProfissional(idProfissional, false);
        res.json(consultasProfissional);
    } catch (err) {
        console.log(err);
    }

});

router.get("/paciente/consulta/:id", async (req, res) => {
    var idPaciente = req.session.paciente.id;
    var idConsulta = req.params.id;

    var consulta = await ConsultaService.acharPorId(idConsulta); 

    if (consulta == undefined || consulta.idPacientel != idPaciente) {
        res.render("erro", {mensagem: "Consulta não encontrada."})
    } else {
        res.render("temporario/consultaPaciente", { consulta })
    }

});

router.get("/profissional/consulta/:id", profissionalAuth, async (req, res) => {
    var idProfissional = req.session.profissional.id;
    var idConsulta = req.params.id;

    var consulta = await ConsultaService.acharPorId(idConsulta);

    if (consulta == undefined || consulta.idProfissional != idProfissional) {
        res.render("erro", {mensagem: "Consulta não encontrada."})
    } else {
        res.render("temporario/consultaMedico", { consulta })
    }
});

router.post("/consulta/atender", profissionalAuth, async (req, res) => {
    var { id, anotacoes } = req.body;
    if(await ConsultaService.atender(id, anotacoes)) {
        res.redirect("/profissional")
    } else {
        res.redirect("/profissional")
    }
});

module.exports = router;