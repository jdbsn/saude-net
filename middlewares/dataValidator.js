const validator = require("validator");

    function verificar(nome, email, cpf, senha, verificaSenha, req, res) {

        if (validator.isAlpha(nome, 'pt-BR', {ignore:' '}) == false || validator.isLength(nome, {min: 8, max: 60}) == false) {
            var nomeError = "Nome inválido.";
        }

        if (validator.isEmail(email) == false) {
            var emailError = "Email inválido.";
        }        

        if (validator.isLength(cpf, {min: 14, max: 14}) == false) {
            var cpfError = "CPF inválido";
        }

        if (validator.isLength(senha, {min: 8, max: 16}) == false) {
            var senhaError = "A senha tem que ter no mínimo 8 caracteres e no máximo 16.";
        }

        if (senha != verificaSenha) {
            var verificaSenhaError = "As senhas não são iguais";
        }

        if (nomeError != undefined || emailError != undefined || cpfError != undefined || senhaError != undefined || verificaSenhaError != undefined) {
            req.flash("erros")
            req.flash("nomeError", nomeError);
            req.flash("emailError", emailError);
            req.flash("cpfError", cpfError);
            req.flash("senhaError", senhaError);
            req.flash("verificaSenhaError", verificaSenhaError);
    
            req.flash("nome", nome);
            req.flash("email", email);
            req.flash("cpf", cpf);
            req.flash("senha", senha);
            req.flash("verificaSenha", verificaSenha);
                
            return false;
                
        } else {
            return true;
        }

    }

module.exports = verificar;