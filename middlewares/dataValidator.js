const validator = require("validator");

    function verificarNome(nome) {
        if (validator.isAlpha(nome, 'pt-BR', {ignore:' '}) == false || validator.isLength(nome, {min: 8, max: 60}) == false) {
            var nomeError = "Nome inválido.";
            return nomeError;
        }
    }

    function verificarEmail(email) {
        if (validator.isEmail(email) == false) {
            var emailError = "Email inválido.";
            return emailError;
        }    
    }

    function verificaSenha(senha, verificaSenha) {
        if (validator.isLength(senha, {min: 8, max: 16}) == false) {
            var senhaError = "A senha tem que ter no mínimo 8 caracteres e no máximo 16.";
            return senhaError;
        }
        
    }

    function verificaConfirmaSenha(senha, confirmaSenha) {
        if (senha != confirmaSenha) {
            var confirmaSenhaError = "As senhas não são iguais";
            return confirmaSenhaError;
        }
    }

    function verificaCpf(cpf) {
        if (validator.isLength(cpf, {min: 14, max: 14}) == false) {
            var cpfError = "CPF inválido.";
            return cpfError;
        }
    }

    function verificaPaciente(nome, email, senha, confirmaSenha, cpf, req, res) {
    
        var nomeError = verificarNome(nome);
        var emailError = verificarEmail(email);
        var senhaError = verificaSenha(senha);
        var confirmaSenhaError = verificaConfirmaSenha(senha, confirmaSenha);
        var cpfError = verificaCpf(cpf)       
        
        if (nomeError || emailError || senhaError || confirmaSenhaError || cpfError) {

            req.flash("nomeError", nomeError);
            req.flash("emailError", emailError);
            req.flash("cpfError", cpfError);
            req.flash("senhaError", senhaError);
            req.flash("confirmaSenhaError", confirmaSenhaError);

            req.flash("nome", nome);
            req.flash("email", email);
            req.flash("cpf", cpf);
            req.flash("senha", senha);
            req.flash("confirmaSenha", confirmaSenha);
                
            return false;
                
        } else {

            return true;

        }

    }

module.exports = verificaPaciente;