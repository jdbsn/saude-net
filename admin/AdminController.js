const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const erros = require("../middlewares/erroHandler");
const dados = require("../middlewares/dataHandler");
const verificar = require("../middlewares/dataValidator");

const adminAuth = require("../middlewares/adminAuth");

const Admin = require("./Admin");
const Paciente = require("../paciente/Paciente");

router.get("/admin/", adminAuth, (req, res) => {
    res.render("admin/indexAdmin", {admin: req.session.admin})
});

router.get("/admin/cadastro", (req, res) => {
    
    errosCA = erros.cadastroAdmin(req, res);
    dadosCA = dados.cadastroAdmin(req, res);

    res.render("admin/cadastroAdmin", {errosCA: errosCA, dadosCA: dadosCA});
});

router.post("/admin/cadastro", (req, res) => {
    var { nome, email, senha, confirmaSenha } = req.body;

    if(verificar.verificarAdmin(nome, email, senha, confirmaSenha, req, res) == false) {
        res.redirect("/admin/cadastro");
    } else {
            Admin.findOne({where: {email: email}}).then(admin => {
                if (admin == undefined) {
        
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(senha, salt);
        
                    Admin.create({
                        nome: nome,
                        email: email,
                        senha: hash,
                    }).then(() => {
                        res.redirect("/admin/login")
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    res.redirect("/admin/signup");
                }
            })
        }

});

router.get("/admin/login", (req, res) => {

    var errosLA = erros.loginAdmin(req, res);
    var dadosLA = dados.loginAdmin(req, res);

    res.render("admin/loginAdmin", {errosLA: errosLA, dadosLA: dadosLA});
});

router.post("/admin/login", (req, res) => {

    var {email, senha} = req.body;

    Admin.findOne({where: {email: email}}).then(admin => {
        if (admin == undefined) {
            var erro = "Email inválido.";
            req.flash("erro", erro);
            req.flash("email", email);
            res.redirect("/admin/login");
        } else {
    
            if(bcrypt.compareSync(senha, admin.senha)) {
    
                req.session.admin = {
                    id: admin.id,
                    nome: admin.nome,
                    email: admin.email,
                }
    
                res.redirect("/admin/");
    
            } else {
                var erro = "Senha inválida.";
                req.flash("erro", erro);
                req.flash("email", email);
                res.redirect("/admin/login");
            }

    }
    }).catch(error => {
        console.log(error);
    });

});

router.get("/admin/pacientes", adminAuth, (req, res) => {
    Paciente.findAll().then(pacientes => {
        res.render("admin/listaPacientes", {pacientes: pacientes});
    });
});

router.get("/admin/paciente/:id", adminAuth, (req, res) => {
    var id = req.params.id

    Paciente.findOne({where: {id: id}}).then(paciente => {
        res.render("admin/detalhePaciente", {paciente: paciente});
    });

});

router.get("/admin/pacientes/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    Paciente.findOne({where: {id: id}}).then(paciente => {
        res.render("admin/editarPaciente", {paciente: paciente});
    })
});

router.post("/admin/pacientes/edit", adminAuth, (req, res) => {

    var { id, nome, email, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado } = req.body;

    Paciente.update({nome, email, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/pacientes');
    })

});

// Deletar paciente
router.post("/admin/pacientes/:id", adminAuth, (req, res) => {
    var id = req.params.id
    Paciente.destroy({where: {id: id}}).then(() => {
        res.redirect("/admin/pacientes")
    })
});

//Logout
router.get("/admin/logout", (req, res) => {
    req.session.admin = undefined;
    res.redirect("/")
});

module.exports = router;