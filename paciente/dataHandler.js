function signUpData(req, res) {

    var email = req.flash("email");
    var nome = req.flash("nome");
    var cpf = req.flash("cpf");
    var senha = req.flash("senha");
    var confirmaSenha = req.flash("confirmaSenha");

    email = (email == undefined || email.lenght == 0) ? "" : email;
    nome = (nome == undefined || nome.lenght == 0) ? "" : nome;
    cpf = (cpf == undefined || cpf.lenght == 0) ? "" : cpf;
    senha = (senha == undefined || senha.lenght == 0) ? "" : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? "" : confirmaSenha;

    return signUpData = {
        email,
        nome,
        cpf,
        senha,
        confirmaSenha
    }

}

function loginData(req, res)  {

    var email = req.flash("email");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return loginData = {
        email
    }

}

module.exports = {
    signUpData,
    loginData
}