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
    var emailPaciente = req.session.paciente.email;
    var {datepicker, hora_inicio, intervalo, idProfissional} = req.body;

    var status = await ConsultaService.criar(datepicker, hora_inicio, intervalo, idPaciente, emailPaciente, idProfissional);

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

router.get("/paciente/consulta/:id", pacienteAuth, async (req, res) => {
    var idPaciente = req.session.paciente.id;
    var idConsulta = req.params.id;

    var consulta = await ConsultaService.acharPorId(idConsulta);

    if (consulta == undefined || consulta.idPaciente != idPaciente) {
        res.render("erro", {mensagem: "Consulta não encontrada."})
    } else {
        res.render("paciente/consultaPaciente", { consulta })
    }
});

router.get("/profissional/consulta/:id", profissionalAuth, async (req, res) => {
    var idProfissional = req.session.profissional.id;
    var idConsulta = req.params.id;

    var consulta = await ConsultaService.acharPorId(idConsulta);

    if (consulta == undefined || consulta.idProfissional != idProfissional) {
        res.render("erro", {mensagem: "Consulta não encontrada."})
    } else {
        res.render("profissional/consultaProfissional", { consulta })
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

router.get("/paciente/consulta/:idConsulta/remarcar", pacienteAuth, async (req, res) => {
    var idConsulta = req.params.idConsulta;
    var idPaciente = req.session.paciente.id;

    var consulta = await ConsultaService.acharPorId(idConsulta);
    
    if(consulta.idPaciente != idPaciente || consulta.status == "finalizado") {
        res.render("erroPaciente", {mensagem: "Não é possivel remarcar esta consulta."});
    } else {
        res.render("paciente/remarcarConsultaPaciente", {idProfissional: consulta.idProfissional, idConsulta});
    }
    
});

router.post("/paciente/consulta/:idConsulta/remarcar", pacienteAuth, async (req, res) => {
    var idConsulta = req.params.idConsulta;
    var {datepicker, hora_inicio, intervalo} = req.body;

    var status = await ConsultaService.remarcar(idConsulta, datepicker, hora_inicio, intervalo);
    
    if(status) {
        res.redirect("/paciente/consultas");
    } else {
        res.redirect("/paciente/consulta/"+idConsulta+"/remarcar")
    }
});

router.get("/profissional/consulta/:idConsulta/remarcar", profissionalAuth, async (req, res) => {
    var idConsulta = req.params.idConsulta;
    var idProfissional = req.session.profissional.id;

    var consulta = await ConsultaService.acharPorId(idConsulta);

    console.log(consulta.status)

    if(consulta.status == "finalizado") {
        res.render("erroProfissional", {mensagem: "Não é possivel remarcar esta consulta."})
    } else {
        res.render("profissional/remarcarConsultaProfissional", {idProfissional, idConsulta});
    }
    
});

router.post("/profissional/consulta/:idConsulta/remarcar", profissionalAuth, async (req, res) => {
    var idConsulta = req.params.idConsulta;
    var {datepicker, hora_inicio, intervalo} = req.body;

    var status = await ConsultaService.remarcar(idConsulta, datepicker, hora_inicio, intervalo);
    
    if(status) {
        res.redirect("/profissional/consultas");
    } else {
        res.redirect("/profissional/consulta/"+idConsulta+"/remarcar")
    }
});

router.post("/paciente/consulta/cancelar", pacienteAuth, async (req, res) => {
    idPaciente = req.session.paciente.id;
    var idConsulta = req.body.idConsulta;
    if(await ConsultaService.cancelarPaciente(idConsulta, idPaciente)) {
        res.redirect("/paciente/consultas")
    } else {
        res.redirect("/paciente/consultas")
    }
});

router.post("/profissional/consulta/cancelar", profissionalAuth, async (req, res) => {
    idProfissional = req.session.profissional.id;
    var idConsulta = req.body.idConsulta;
    if(await ConsultaService.cancelarProfissional(idConsulta, idProfissional)) {
        res.redirect("/profissional/consultas")
    } else {
        res.redirect("/profissional/consultas")
    }
});

module.exports = router;