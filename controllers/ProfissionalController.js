const express = require ("express");
const router = express.Router();

const erros = require("../middlewares/erroHandler");
const dados = require("../middlewares/dataHandler");

const profissionalAuth = require("../middlewares/auth/profissionalAuth");
const Paciente = require("../models/Paciente");

const ProfissionalService = require("../services/ProfissionalService");
const VagaService = require("../services/VagaService");
const TokenService = require("../services/TokenService");

const pacienteAuth = require("../middlewares/auth/pacienteAuth");
const agendamentoAuth = require("../middlewares/auth/agendamentoAuth");
const ConsultaService = require("../services/ConsultaService");

router.get("/profissional", profissionalAuth, (req, res) => {
    res.render("profissional/indexProfissional", {profissional: req.session.profissional});
});

router.get("/profissional/cadastro", (req, res) => {
    var errosCPr = erros.cadastroProfissional(req, res);
    var dadosCPr = dados.cadastroProfissional(req, res);

    res.render("profissional/cadastroProfissional", {errosCPr, dadosCPr});
});

router.post("/profissional/cadastro", async (req, res) => {
    var { nome, email, senha, confirmaSenha, cpf, data_nascimento, genero, telefone } = req.body;
    var { rua, bairro, cep, cidade, estado, tipo, especialidade, numero_conselho } = req.body;

    if(await ProfissionalService.criar(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, 
    rua, bairro, cidade, estado, tipo, especialidade, numero_conselho, req, res)) {
        res.redirect("/profissional/login");
    } else {
        res.redirect("/profissional/cadastro")
    }

});

router.get("/profissional/login", (req, res) => {

    var errosLPr = erros.loginProfissional(req, res);
    var dadosLPr = dados.loginProfissional(req, res);

    res.render("profissional/loginProfissional", {errosLPr, dadosLPr});
});

router.post("/profissional/login", async (req, res) => {

    var {email, senha} = req.body;

    if(await ProfissionalService.login(email, senha, req, res)) {
        res.redirect("/profissional")
    } else {
        res.redirect("/profissional/login")
    }

});

router.get("/profissional/dados", profissionalAuth, (req, res) => {
    res.render("profissional/dadosProfissional", {profissional: req.session.profissional})
});

router.post("/profissional/dados", profissionalAuth, async (req, res) => {
    
    var {id, nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado} = req.body;

    try {
        if(await ProfissionalService.editar(id, nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado, req, res)) {
            res.redirect("/profissional/dados");
        } else {
            res.send("Edição falhou.");
        }
    } catch (err) {
        console.log(err)
    }
});

router.get("/profissional/esqueciminhasenha", (req, res) => {

    var errosESPr = erros.esqueciSenhaProfissional(req, res);
    var dadosESPr = dados.esqueciSenhaProfissional(req, res);

    res.render("profissional/esqueciSenhaProfissional", { errosESPr, dadosESPr, mensagem: req.flash("confirmacaoESPr")})
});

router.post("/profissional/esqueciminhasenha", async (req, res) => {
    var email = req.body.email;

    var token = await TokenService.criarTokenProfissional(email, req, res)

    if(token.status) {
        res.redirect("/profissional/esqueciminhasenha");
    } else {
        res.redirect("/profissional/esqueciminhasenha");
    }

});

router.get("/profissional/redefinirsenha/:token", async (req, res) => {
    var token = req.params.token;

    var resultado = await TokenService.validarTokenProfissional(token);

    if(resultado.status) {
        var errosRSPr = erros.redefinirSenhaProfissional(req, res);
        var dadosRSPr = dados.redefinirSenhaProfissional(req, res);
        res.render("profissional/redefinirSenhaProfissional", {token: resultado.token, errosRSPr, dadosRSPr})
    } else {
        res.render("erroRecuperarSenha", {mensagem: resultado.msg})
    }

});

router.post("/profissional/redefinirsenha/:token", async (req, res) => {
    var token = req.params.token;
    var { novaSenha, confirmaSenha } = req.body;

    var resultado = await TokenService.validarTokenProfissional(token);

    if(resultado.status) {
        if(await ProfissionalService.redefinirSenha(novaSenha, confirmaSenha, resultado.idProfissional, req, res)) {
            await TokenService.deletarTokenProfissional(resultado.token);
            res.redirect("/profissional/login");
        } else {
            res.redirect("/profissional/redefinirsenha/"+token);
        }
    } else {
        res.redirect("/profissional/redefinirsenha/"+token);
    }

});

router.get("/profissional/vagas", profissionalAuth, async (req, res) => {
    idProfissional = req.session.profissional.id;
    var vagas = await VagaService.acharTodos(idProfissional);
    res.render("profissional/diasAtendimento", {vagas, idProfissional});
});

router.post("/profissional/vaga/criar", profissionalAuth, async (req, res) => {
    var idProfissional = req.session.profissional.id;
    var { datepicker, hora_inicio, hora_fim, intervalo } = req.body;
    
    if(await VagaService.criar(datepicker, hora_inicio, hora_fim, intervalo, idProfissional)) {
        res.redirect("/profissional/vagas");
    } else {
        res.redirect("/profissional/vagas");
    }
});

router.post("/profissional/vaga/apagar", profissionalAuth, async (req, res) => {
    var idProfissional = req.session.profissional.id;
    var idVaga = req.body.idVaga;
    
    if(await VagaService.apagar(idVaga, idProfissional)) {
        res.redirect("/profissional/vagas");
    } else {
        res.redirect("/profissional/vagas");
    }
});

router.get("/profissional/consultas", profissionalAuth, async (req, res) =>{
    var idProfissional = req.session.profissional.id;
    var consultas = await ConsultaService.pegarTodosProfissional(idProfissional, true);
    res.render("profissional/listaConsultaProfissional", {consultas})
});

router.get("/pesquisa", async (req, res) => {
    var paciente = req.session.paciente;
    var q = req.query.q;
    var profissionais = await ProfissionalService.achar(q);
    res.render("listaprofissionais", {profissionais, q, paciente});

});

router.get("/profissional/logout", profissionalAuth, (req, res) => {
    req.session.profissional = undefined;
    res.redirect("/");
});

router.post("/profissional/apagarconta", profissionalAuth, (req, res) => {
    var id = req.body.id;
    Paciente.destroy({where: {id: id}}).then(() => {
        req.session.paciente = undefined;
        res.redirect("/")
    })
});

router.get("/profissional/:idProfissional", async (req, res) => {
    var idProfissional = req.params.idProfissional;
    var paciente = req.session.paciente;

    req.session.idProfissionalAgendamento = idProfissional;

    var profissional = await ProfissionalService.acharPorId(idProfissional);
    console.log(profissional);
    
    res.render("profissional/perfilprofissional", {profissional, paciente});
});

router.get("/delete/:id", (req, res) => {
    var id = req.params.id;

    console.log(id)
});

module.exports = router;