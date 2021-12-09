const validator = require("validator");
const Paciente = require("../models/Paciente");
const Profissional = require("../models/Profissional");

    function verificarNome(nome) {
        if (validator.isAlpha(nome, 'pt-BR', {ignore:' '}) == false || validator.isLength(nome, {min: 8, max: 60}) == false) {
            var nomeError = "Nome inválido.";
            return nomeError;
        }
    }

    function verificarGenero(genero) {
        if(genero == undefined) {
            var generoError = "Selecione um gênero."
            return generoError;
        }
    }

    function validarEmail(email) {
        if(validator.isEmail(email) == false) {
            var emailError = "Email inválido.";
            return emailError;
        } 
    }

    async function verificarEmailPaciente(email) {
        if(validarEmail(email) != undefined) {
            var emailError = "Email inválido.";
            return emailError;
        } else {
            try {
                const user = await Paciente.findOne({where: {email: email}})
                if(user != null) {
                    var emailError = "Email já existe.";
                    return emailError;
                }
                } catch (error) {
                    console.log(error)
                }
            }
        
      }

    async function verificarEmailProfissional(email) {
        if(validarEmail(email) != undefined) {
            var emailError = "Email inválido.";
            return emailError;
        } else {
            try {
                const user = await Profissional.findOne({where: {email: email}})
                if(user != null) {
                    var emailError = "Email já existe.";
                    return emailError;
                }
                } catch (error) {
                    console.log(error)
                }
            }
        
    }

    async function verificarEmailAdmin(email) {
        if(validarEmail(email) != undefined) {
            var emailError = "Email inválido.";
            return emailError;
        } else {
            try {
                const user = await Admin.findOne({where: {email: email}})
                if(user != null) {
                    var emailError = "Email já existe.";
                    return emailError;
                }
                } catch (error) {
                    console.log(error)
                }
            }
        
    }
    
    
    function verificaSenha(senha) {
        if (validator.isLength(senha, {min: 8, max: 16}) == false) {
            var senhaError = "A senha tem que ter no mínimo 8 caracteres e no máximo 16.";
            return senhaError;
        }
        
    }

    function verificaConfirmaSenha(senha, confirmaSenha) {
        if (senha != confirmaSenha) {
            var confirmaSenhaError = "As senhas não são iguais.";
            return confirmaSenhaError;
        }
    }

    function verificaDataNascimento(data_nascimento) {
        if(validator.isDate(data_nascimento) == false) {
            var datanascimentoError = "Data inválida."
            return  datanascimentoError;
        }
    }

    async function verificaCpfPaciente(cpf) {
        if (validator.isLength(cpf, {min: 14, max: 14}) == false) {
            var cpfError = "CPF inválido.";
            return cpfError;
        } else {
            var user = await Paciente.findOne({where: {cpf: cpf}});
            if(user != null) {
                var cpfError = "CPF já cadastrado.";
                return cpfError;
            }
        }
        
    }

    async function verificaCpfProfissional(cpf) {
        if (validator.isLength(cpf, {min: 14, max: 14}) == false) {
            var cpfError = "CPF inválido.";
            return cpfError;
        } else {
            var user = await Profissional.findOne({where: {cpf: cpf}});
            if(user != null) {
                var cpfError = "CPF já cadastrado.";
                return cpfError;
            }
        }
        
    }

    function verificaTelefone(telefone) {
        if(validator.isMobilePhone(telefone, 'pt-BR') == false) {
            var telefoneError = "Telefone inválido.";
            return telefoneError;
        }
    }

    function verificarCep(cep) {
        if(validator.isInt(cep, {ignore:'-'}) || validator.isLength(cep, {min: 9, max: 9}) == false) {
            var cepError = "CEP inválido.";
            return cepError;
        }
    }

    function verificarRua(rua) {
        if(validator.isLength(rua, {min: 8, max: 40}) == false) {
            var ruaError = "Rua inválida.";
            return ruaError;
        }
    }

    function verificarBairro(bairro) {
        if(validator.isLength(bairro, {min: 4, max: 30}) == false) {
            var bairroError = "Bairro inválido.";
            return bairroError;
        }
    }

    function verificarCidade(cidade) {
        if(cidade == undefined) {
            var cidadeError = "Cidade inválida.";
            return cidadeError;
        }
    }

    async function verificarPaciente(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, req, res) {
    
        var nomeError = verificarNome(nome);
        var generoError = verificarGenero(genero);
        var emailError = await verificarEmailPaciente(email);
        var senhaError = verificaSenha(senha);
        var confirmaSenhaError = verificaConfirmaSenha(senha, confirmaSenha);
        var datanascimentoError = verificaDataNascimento(data_nascimento);
        var cpfError = await verificaCpfPaciente(cpf);
        var telefoneError = verificaTelefone(telefone);
        var cepError = verificarCep(cep);
        var ruaError = verificarRua(rua);
        var bairroError = verificarBairro(bairro);
        var cidadeError = verificarCidade(cidade);
        
        if (nomeError || generoError || emailError || senhaError || confirmaSenhaError || datanascimentoError || cpfError || cepError || ruaError || bairroError || cidadeError) {

            req.flash("nomeErrorCP", nomeError);
            req.flash("generoErrorCP", generoError);
            req.flash("emailErrorCP", emailError);
            req.flash("datanascimentoErrorCP", datanascimentoError);
            req.flash("cpfErrorCP", cpfError);
            req.flash("senhaErrorCP", senhaError);
            req.flash("confirmaSenhaErrorCP", confirmaSenhaError);
            req.flash("telefoneErrorCP", telefoneError);
            req.flash("cepErrorCP", cepError);
            req.flash("ruaErrorCP", ruaError);
            req.flash("bairroErrorCP", bairroError);
            req.flash("cidadeErrorCP", cidadeError);

            req.flash("nomeCP", nome);
            req.flash("generoCP", genero)
            req.flash("emailCP", email);
            req.flash("data_nascimentoCP", data_nascimento)
            req.flash("cpfCP", cpf);
            req.flash("senhaCP", senha);
            req.flash("confirmaSenhaCP", confirmaSenha);
            req.flash("telefoneCP", telefone);
            req.flash("cepCP", cep);
            req.flash("ruaCP", rua);
            req.flash("bairroCP", bairro);
            req.flash("cidadeCP", cidade);
              
            return false;
                
        } else {
            console.log("True");
            return true;

        }

    }

    async function verificarAdmin (nome, email, senha, confirmaSenha, req, res) {
        var nomeError = verificarNome(nome);
        var emailError = await verificarEmailAdmin(email);
        var senhaError = verificaSenha(senha);
        var confirmaSenhaError = verificaConfirmaSenha(senha, confirmaSenha);
        
        if (nomeError || emailError || senhaError || confirmaSenhaError) {

            req.flash("nomeError", nomeError);
            req.flash("emailError", emailError);
            req.flash("senhaError", senhaError);
            req.flash("confirmaSenhaError", confirmaSenhaError);

            req.flash("nome", nome);
            req.flash("email", email);
            req.flash("senha", senha);
            req.flash("confirmaSenha", confirmaSenha);
                
            return false;
                
        } else {

            return true;

        }
    }

    async function verificarProfissional(nome, genero, email, senha, confirmaSenha, data_nascimento, cpf, telefone, cep, rua, bairro, cidade, req, res) {
        var nomeError = verificarNome(nome);
        var generoError = verificarGenero(genero);
        var emailError = await verificarEmailProfissional(email);
        var senhaError = verificaSenha(senha);
        var confirmaSenhaError = verificaConfirmaSenha(senha, confirmaSenha);
        var datanascimentoError = verificaDataNascimento(data_nascimento);
        var cpfError = await verificaCpfProfissional(cpf);
        var telefoneError = verificaTelefone(telefone);
        var cepError = verificarCep(cep);
        var ruaError = verificarRua(rua);
        var bairroError = verificarBairro(bairro);
        var cidadeError = verificarCidade(cidade);
        
        if (nomeError || generoError || emailError || senhaError || confirmaSenhaError || datanascimentoError || cpfError || cepError || ruaError || bairroError || cidadeError) {

            req.flash("nomeErrorCPr", nomeError);
            req.flash("generoErrorCPr", generoError);
            req.flash("emailErrorCPr", emailError);
            req.flash("datanascimentoErrorCPr", datanascimentoError);
            req.flash("cpfErrorCPr", cpfError);
            req.flash("senhaErrorCPr", senhaError);
            req.flash("confirmaSenhaErrorCPr", confirmaSenhaError);
            req.flash("telefoneErrorCPr", telefoneError);
            req.flash("cepErrorCPr", cepError);
            req.flash("ruaErrorCPr", ruaError);
            req.flash("bairroErrorCPr", bairroError);
            req.flash("cidadeErrorCPr", cidadeError);

            req.flash("nomeCPr", nome);
            req.flash("generoCPr", genero)
            req.flash("emailCPr", email);
            req.flash("data_nascimentoCPr", data_nascimento)
            req.flash("cpfCPr", cpf);
            req.flash("senhaCPr", senha);
            req.flash("confirmaSenhaCPr", confirmaSenha);
            req.flash("telefoneCPr", telefone);
            req.flash("cepCPr", cep);
            req.flash("ruaCPr", rua);
            req.flash("bairroCPr", bairro);
            req.flash("cidadeCPr", cidade);
              
            return false;
                
        } else {
            console.log("True");
            return true;

        }
    }

    function redefinirSenhaPaciente (novaSenha, confirmaSenha, req, res) {

        var senhaError = verificaSenha(novaSenha);
        var confirmaSenhaError = verificaConfirmaSenha(novaSenha, confirmaSenha);

        if (senhaError || confirmaSenhaError) {

            req.flash("senhaErrorRSP", senhaError);
            req.flash("confirmaSenhaErrorRSP", confirmaSenhaError);

            req.flash("senhaRSP", novaSenha);
            req.flash("confirmaSenhaRSP", confirmaSenha);
                
            return false;
                
        } else {

            return true;

        }
    }

    function redefinirSenhaProfissional (novaSenha, confirmaSenha, req, res) {

        var senhaError = verificaSenha(novaSenha);
        var confirmaSenhaError = verificaConfirmaSenha(novaSenha, confirmaSenha);

        if (senhaError || confirmaSenhaError) {

            req.flash("senhaErrorRSPr", senhaError);
            req.flash("confirmaSenhaErrorRSPr", confirmaSenhaError);

            req.flash("senhaRSPr", novaSenha);
            req.flash("confirmaSenhaRSPr", confirmaSenha);
                
            return false;
                
        } else {

            return true;

        }
    }

module.exports = {
    verificarPaciente,
    verificarAdmin,
    verificarProfissional,
    redefinirSenhaPaciente,
    redefinirSenhaProfissional
}