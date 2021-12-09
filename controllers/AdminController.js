const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const erros = require("../middlewares/erroHandler");
const dados = require("../middlewares/dataHandler");
const verificar = require("../middlewares/dataValidator");

const adminAuth = require("../middlewares/auth/adminAuth");

const Admin = require("../models/Admin");
const Paciente = require("../models/Paciente");
const Profissional = require("../models/Profissional")

const PlanoSaudeService = require("../services/PlanoSaudeService");

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
        res.render("admin/paciente/listaPacientes", {pacientes: pacientes});
    });
});

router.get("/admin/pacientes/:id", adminAuth, (req, res) => {
    var id = req.params.id

    Paciente.findOne({where: {id: id}}).then(paciente => {
        res.render("admin/paciente/detalhePaciente", {paciente: paciente});
    });

});

router.get("/admin/pacientes/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    Paciente.findOne({where: {id: id}}).then(paciente => {
        res.render("admin/paciente/editarPaciente", {paciente: paciente});
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
router.post("/admin/pacientes/apagar", adminAuth, (req, res) => {
    var id = req.body.id
    Paciente.destroy({where: {id: id}}).then(() => {
        res.redirect("/admin/pacientes")
    })
});

// Lista de profissionais
router.get("/admin/profissionais", adminAuth, (req, res) => {
    Profissional.findAll().then(profissionais => {
        res.render("admin/profissional/listaProfissionais", {profissionais: profissionais});
    });
});

// Detalhe profissional por ID
router.get("/admin/profissionais/:id", adminAuth, (req, res) => {
    var id = req.params.id

    Profissional.findOne({where: {id: id}}).then(profissional => {
        res.render("admin/profissional/detalheProfissional", {profissional: profissional});
    });

});

// Página de editar profissional
router.get("/admin/profissionais/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id;

    Profissional.findOne({where: {id: id}}).then(profissional => {
        res.render("admin/profissional/editarProfissional", {profissional: profissional});
    })
});

// Editar profissional
router.post("/admin/profissionais/edit", adminAuth, (req, res) => {

    var { id, nome, email, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado } = req.body;

    Profissional.update({nome, email, cpf, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/profissionais');
    })

});

// Deletar profissional
router.post("/admin/profissionais/apagar", adminAuth, (req, res) => {
    var id = req.body.id
    Profissional.destroy({where: {id: id}}).then(() => {
        res.redirect("/admin/profissionais")
    })
});

//Lista de planos de saúde
router.get("/admin/planossaude", adminAuth, async (req, res) => {
    var planos = await PlanoSaudeService.acharTodos();
    res.render("admin/planosaude/listaPlanoSaude", {planos})
});

//Criar plano de saúde
router.get("/admin/planosaude/criar", adminAuth, (req, res) => {
    res.render("admin/planosaude/criarPlanoSaude")
});

//Criar plano de saúde
router.post("/admin/planosaude/criar", adminAuth, async (req, res) => {
    var nome = req.body.nome;

    try {
        if(await PlanoSaudeService.criar(nome)) {
            res.redirect("/admin/planossaude");
        } else {
            res.redirect("/admin/planosaude/criar");
        }
    } catch (err) {
        console.log(err); 
    }

});

//Editar plano de saúde
router.get("/admin/planosaude/editar/:id", adminAuth, async (req, res) => {
    id = req.params.id;
    var plano = await PlanoSaudeService.acharUm(id)
    res.render("admin/planosaude/editarPlanoSaude", {plano})
});

//Editar plano de saúde
router.post("/admin/planosaude/editar", adminAuth, async (req, res) => {
    var { nome, id } = req.body;

    try {
        if (await PlanoSaudeService.editar(id, nome)) {
            res.redirect("/admin/planossaude");
        } else {
            res.redirect("/admin/planossaude/")
        }

    } catch (err) {
        console.log(err); 
    }
    
});

//Apagar plano de saúde
router.post("/admin/planosaude/apagar", adminAuth, async (req, res) => {
    var id = req.body.id;

    try {
        if (await PlanoSaudeService.apagar(id)) {
            res.redirect("/admin/planossaude");
        } else {
            res.redirect("/admin/planossaude/")
        }

    } catch (err) {
        console.log(err); 
    }
    
});

//Logout
router.get("/admin/logout", (req, res) => {
    req.session.admin = undefined;
    res.redirect("/")
});

module.exports = router;