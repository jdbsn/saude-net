const express = require("express");
const router = express.Router();

const erros = require("../middlewares/erroHandler");
const dados = require("../middlewares/dataHandler");

const pacienteAuth = require("../middlewares/auth/pacienteAuth");

const Paciente = require ("../models/Paciente");

const PacienteService = require("../services/PacienteService");
const ConsultaService = require("../services/ConsultaService");
const TokenService = require("../services/TokenService");

router.get("/paciente", pacienteAuth, (req, res) => {
    res.render("paciente/indexPaciente", {paciente: req.session.paciente})
});

router.get("/paciente/cadastro", (req, res) => {

    var errosCP = erros.cadastroPaciente(req, res);
    var dadosCP = dados.cadastroPaciente(req, res);

    res.render("paciente/cadastroPaciente", {errosCP, dadosCP});

});

router.post("/paciente/cadastro", async (req, res) => {
    var { nome, email, senha, confirmaSenha, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado } = req.body;

    if(await PacienteService.criar(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, estado, req, res)) {
        res.redirect("/paciente/login")
    } else {
        res.redirect("/paciente/cadastro")
    }

});

router.get("/paciente/login", (req, res) => {

    var errosLP = erros.loginPaciente(req, res);
    var dadosLP = dados.loginPaciente(req, res);
    
    res.render("paciente/loginPaciente", {errosLP, dadosLP});
});

router.post("/paciente/login", async (req, res) => {

    var {email, senha} = req.body;
    var redirecionarPara = req.session.redirecionarPara || "/paciente";
    console.log(redirecionarPara)

    if(await PacienteService.login(email, senha, req, res)) {
        res.redirect(redirecionarPara);
    } else {
        res.redirect("/paciente/login")
    }

});

router.get("/paciente/dados", pacienteAuth, (req, res) => {
    paciente = req.session.paciente;
    res.render("paciente/dadosPaciente", {paciente: paciente});
});

router.post("/paciente/dados", pacienteAuth, (req, res) => {
    var { id, nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado } = req.body;

    Paciente.update({nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado}, {
        where: {
            id: id
        }
    }).then(() => {
        req.session.paciente.nome = nome;
        req.session.paciente.data_nascimento = data_nascimento;
        req.session.paciente.telefone = telefone;
        req.session.paciente.genero = genero;
        req.session.paciente.rua = rua;
        req.session.paciente.bairro = bairro;
        req.session.paciente.cep = cep;
        req.session.paciente.cidade = cidade;
        req.session.paciente.estado = estado;

        res.redirect("/paciente/dados")
    });
});

router.get("/paciente/esqueciminhasenha", (req, res) => {

    var errosESP = erros.esqueciSenhaPaciente(req, res);
    var dadosESP = dados.esqueciSenhaPaciente(req, res);

    res.render("paciente/esqueciSenhaPaciente", { errosESP, dadosESP, mensagem: req.flash("confirmacaoESP")})
});

router.post("/paciente/esqueciminhasenha", async (req, res) => {
    var email = req.body.email;

    var token = await TokenService.criarTokenPaciente(email, req, res)

    if(token.status) {
        res.redirect("/paciente/esqueciminhasenha");
    } else {
        res.redirect("/paciente/esqueciminhasenha");
    }

});

router.get("/paciente/redefinirsenha/:token", async (req, res) => {
    var token = req.params.token;

    var resultado = await TokenService.validarTokenPaciente(token);

    if(resultado.status) {
        var errosRSP = erros.redefinirSenhaPaciente(req, res);
        var dadosRSP = dados.redefinirSenhaPaciente(req, res);
        res.render("paciente/redefinirSenhaPaciente", {token: resultado.token, errosRSP, dadosRSP})
    } else {
        res.render("erroRecuperarSenha", {mensagem: resultado.msg})
    }

});

router.post("/paciente/redefinirsenha/:token", async (req, res) => {
    var token = req.params.token;
    var { novaSenha, confirmaSenha } = req.body;

    var resultado = await TokenService.validarTokenPaciente(token);

    if(resultado.status) {
        if(await PacienteService.redefinirSenha(novaSenha, confirmaSenha, resultado.idPaciente, req, res)) {
            await TokenService.deletarTokenPaciente(resultado.token);
            res.redirect("/paciente/login");
        } else {
            res.redirect("/paciente/redefinirsenha/"+token);
        }
    } else {
        res.redirect("/paciente/redefinirsenha/"+token);
    }

});

router.get("/paciente/:id/mostrarcalendario", async (req, res) => {
    var idPaciente = req.params.id;
    
    var consultasPaciente = await ConsultaService.pegarTodosPaciente(idPaciente, false);
    console.log(consultasPaciente);

    res.json(consultasPaciente);

});

router.get("/paciente/consultas", pacienteAuth, async (req, res) => {
    idPaciente = req.session.paciente.id;
    var consultas = await ConsultaService.pegarTodosPaciente(idPaciente, true);
    console.log(consultas);
    res.render("paciente/listaConsultaPaciente", {consultas});
});

router.get("/paciente/logout", pacienteAuth, (req, res) => {
    req.session.paciente = undefined;
    res.redirect("/")
});

router.post("/paciente/apagarconta", pacienteAuth, (req, res) => {
    var id = req.body.id;
    Paciente.destroy({where: {id: id}}).then(() => {
        req.session.paciente = undefined;
        res.redirect("/")
    })
});

module.exports = router; 