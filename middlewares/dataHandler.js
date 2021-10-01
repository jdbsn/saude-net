function cadastroPaciente(req, res) {

    var email = req.flash("email");
    var nome = req.flash("nome");
    var cpf = req.flash("cpf");
    var senha = req.flash("senha");
    var confirmaSenha = req.flash("confirmaSenha");
    var telefone = req.flash("telefone");

    email = (email == undefined || email.lenght == 0) ? "" : email;
    nome = (nome == undefined || nome.lenght == 0) ? "" : nome;
    cpf = (cpf == undefined || cpf.lenght == 0) ? "" : cpf;
    senha = (senha == undefined || senha.lenght == 0) ? "" : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? "" : confirmaSenha;
    telefone = (telefone == undefined || telefone.lenght == 0) ? "" : telefone;

    return cadastroPaciente = {
        email,
        nome,
        cpf,
        senha,
        confirmaSenha,
        telefone
    }

}

function loginPaciente(req, res)  {

    var email = req.flash("email");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return loginPaciente = {
        email
    }

}

function cadastroAdmin(req, res) {

    var email = req.flash("email");
    var nome = req.flash("nome");
    var senha = req.flash("senha");
    var confirmaSenha = req.flash("confirmaSenha");

    email = (email == undefined || email.lenght == 0) ? "" : email;
    nome = (nome == undefined || nome.lenght == 0) ? "" : nome;
    senha = (senha == undefined || senha.lenght == 0) ? "" : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? "" : confirmaSenha;

    return dadosCadastroAdmin = {
        email,
        nome,
        senha,
        confirmaSenha,
    }

}

function loginAdmin(req, res)  {

    var email = req.flash("email");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return dadosLoginAdmin = {
        email
    }

}

module.exports = {
    cadastroPaciente,
    loginPaciente,
    cadastroAdmin,
    loginAdmin
}