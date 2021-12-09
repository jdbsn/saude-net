const Paciente = require("../models/Paciente");
const { Op } = require("sequelize");

const verificar = require("../middlewares/dataValidator");

const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class PacienteService {

    async criar(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, estado, req, res) {
        
    var verificaCad = await verificar.verificarPaciente(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, req, res);
    console.log(verificaCad);
    if(verificaCad == false) {
        return false;
    } else {         
        
        try {

            var hash = bcrypt.hashSync(senha, salt);
            
            await Paciente.create({
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
            var paciente = await this.acharPorEmail(email);

            if(paciente == undefined) {
                var erro = "Email inválido.";
                req.flash("erro", erro);
                req.flash("email", email);
                return false;
            } else {
                if(bcrypt.compareSync(senha, paciente.senha)) {
            
                    req.session.paciente = {
                        id: paciente.id,
                        nome: paciente.nome,
                        email: paciente.email,
                        cpf: paciente.cpf,
                        data_nascimento: paciente.data_nascimento,
                        telefone: paciente.telefone,
                        genero: paciente.genero,
                        rua: paciente.rua,
                        bairro: paciente.bairro,
                        cep: paciente.cep,
                        cidade: paciente.cidade,
                        estado: paciente.estado
                    }
                    return true;
                } else {
                    var erro = "Senha inválida.";
                    req.flash("erro", erro);
                    req.flash("email", email);
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
            return await Paciente.findOne({where: {id: id}});
        } catch (err) {
            console.log(err);
        }
    }

    async acharPorEmail(email) {
        try {
            return await Paciente.findOne({where: {email: email}});
        } catch (err) {
            console.log(err);
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

    async redefinirSenha(novaSenha, confirmaSenha, id, req, res) {

        try {
            var tf = verificar.redefinirSenhaPaciente(novaSenha, confirmaSenha, req, res)
            if(tf) {
                var hash = bcrypt.hashSync(novaSenha, salt);
                await Paciente.update({senha: hash}, {where: {id: id}});

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

module.exports = new PacienteService();