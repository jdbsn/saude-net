const Profissional = require("../models/Profissional");
const { Op } = require("sequelize");

const verificar = require("../middlewares/dataValidator");

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class ProfissionalService {

    async criar(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, estado, tipo, especialidade, numero_conselho, req, res) {
        var verificaCad = await verificar.verificarProfissional(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, req, res)
    
        if(verificaCad == false) {
            return false
        } else {

            var hash = bcrypt.hashSync(senha, salt);

            try {
                await Profissional.create({
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
                    estado: estado,
                    tipo,
                    especialidade,
                    numero_conselho
                })
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }

        }
    }

    async login(email, senha, req, res) {

        try {
            var profissional = await Profissional.findOne({where: {email: email}});

            if(profissional == undefined) {
                var erroLPr = "Email inválido.";
                req.flash("erroLPr", erroLPr);
                req.flash("emailLPr", email);
                return false;
            } else {
                
                if(bcrypt.compareSync(senha, profissional.senha)) {
    
                    req.session.profissional = {
                        id: profissional.id,
                        nome: profissional.nome,
                        email: profissional.email,
                        cpf: profissional.cpf,
                        data_nascimento: profissional.data_nascimento,
                        telefone: profissional.telefone,
                        genero: profissional.genero,
                        rua: profissional.rua,
                        bairro: profissional.bairro,
                        cep: profissional.cep,
                        cidade: profissional.cidade,
                        estado: profissional.estado,
                        tipo: profissional.tipo,
                        especialidade: profissional.especialidade,
                        numero_conselho: profissional.numero_conselho
                    }
    
                    return true
    
                } else {
                    var erro = "Senha inválida.";
                    req.flash("erroLPr", erro);
                    req.flash("emailLPr", email);
    
                    return false;
                }
    
            }
        } catch (err) {
            console.log(err);
            return false;
        }

        
        
    }

    async editar(id, nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado, req, res) {
    
        try {
            await Profissional.update({nome, data_nascimento, genero, telefone, rua, bairro, cep, cidade, estado}, {where: {id: id}});
            req.session.profissional.nome = nome;
            req.session.profissional.data_nascimento = data_nascimento;
            req.session.profissional.telefone = telefone;
            req.session.profissional.genero = genero;
            req.session.profissional.rua = rua;
            req.session.profissional.bairro = bairro;
            req.session.profissional.cep = cep;
            req.session.profissional.cidade = cidade;
            req.session.profissional.estado = estado;
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
        
    }

    async acharPorId(id) {
        try {
            return await Profissional.findOne({where: {id: id}});

        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async acharPorTipo(tipo, especialidade) {
        try {
            var profissionais = await Profissional.findAll({where: {
                [Op.and]: [{tipo: tipo}, {especialidade: especialidade}]
            }})
            return profissionais;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async acharPorEmail(email) {

        try {
            return await Profissional.findOne({where: {email: email}});
        } catch (err) {
            console.log(err);
        }

    }

    async achar(pesquisa) {
        try {
            if (pesquisa == undefined) {
                return [];
            } else {
                return await Profissional.findAll({where: {
                    [Op.or]: [{tipo: pesquisa}, {especialidade: pesquisa}]
                }});
            }
            
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async redefinirSenha(novaSenha, confirmaSenha, id, req, res) {
        try {
            var tf = verificar.redefinirSenhaProfissional(novaSenha, confirmaSenha, req, res)
            if(tf) {
                var hash = bcrypt.hashSync(novaSenha, salt);
                await Profissional.update({senha: hash}, {where: {id: id}});
                return true;
            } else {
                return false;
            }
            
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

module.exports = new ProfissionalService();