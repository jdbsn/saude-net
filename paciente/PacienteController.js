const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const erros = require("./erroHandler");
const data = require("./dataHandler");
const verificar = require("../middlewares/dataValidator");

const pacienteAuth = require("../middlewares/pacienteAuth");

const Paciente = require ("./Paciente");

router.get("/paciente/", pacienteAuth, (req, res) => {
    res.render("paciente/indexPaciente", {paciente: req.session.paciente})
});

router.get("/paciente/cadastro", (req, res) => {

    var signUpErros = erros.signUpErros(req, res);
    var signUpData = data.signUpData(req, res);

    res.render("paciente/teladecadastro", {signUpErros, signUpData});

});

router.post("/paciente/cadastro", (req, res) => {
    var { nome, email, senha, verificaSenha, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado } = req.body;

    if(verificar(nome, email, cpf, senha, verificaSenha, req, res) == false) {
        res.redirect("/paciente/cadastro");
    } else {
            Paciente.findOne({where: {email: email}}).then(paciente => {
                if (paciente == undefined) {
        
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(senha, salt);
        
                    Paciente.create({
                        nome: nome,
                        email: email,
                        senha: hash,
                        cpf: cpf, 
                        data_nascimento: data_nascimento,
                        genero: genero,
                        telefone: telefone,
                        rua: rua,
                        bairro: bairro,
                        cep: cep, 
                        cidade: cidade, 
                        estado: estado
                    }).then(() => {
                        res.redirect("/paciente/login")
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    res.redirect("/paciente/signup");
                }
            })
        }

});

router.get("/paciente/login", (req, res) => {

    var loginErros = erros.loginErros(req, res);
    var loginData = data.loginData(req, res);
    
    res.render("paciente/teladelogindef", {loginErros, loginData});
});

router.post("/paciente/login", (req, res) => {

    var {email, senha} = req.body;

    Paciente.findOne({where: {email: email}}).then(paciente => {
        if (paciente == undefined) {
            var erro = "Email inválido.";
            req.flash("erro", erro);
            req.flash("email", email);
            res.redirect("/paciente/login");
        } else {
    
            if(bcrypt.compareSync(senha, paciente.senha)) {
    
                req.session.paciente = {
                    id: paciente.id,
                    nome: paciente.nome,
                    email: paciente.email,
                }
    
                res.redirect("/paciente/");
    
            } else {
                var erro = "Senha inválida.";
                req.flash("erro", erro);
                req.flash("email", email);
                res.redirect("/paciente/login");
            }

    }
    }).catch(error => {
        console.log(error);
    });

});

router.get("/paciente/logout", (req, res) => {
    req.session.paciente = undefined;
    res.redirect("/")
});

module.exports = router; 