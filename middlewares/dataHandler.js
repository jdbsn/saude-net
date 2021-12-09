function cadastroPaciente(req, res) {

    var email = req.flash("emailCP");
    var genero = req.flash("generoCP");
    var nome = req.flash("nomeCP");
    var data_nascimento = req.flash("data_nascimentoCP");
    var cpf = req.flash("cpfCP");
    var senha = req.flash("senhaCP");
    var confirmaSenha = req.flash("confirmaSenhaCP");
    var telefone = req.flash("telefoneCP");
    var cep = req.flash("cepCP");
    var rua = req.flash("ruaCP");
    var bairro = req.flash("bairroCP");
    var cidade = req.flash("cidadeCP");

    nome = (nome == undefined || nome.lenght == 0) ? "" : nome;
    genero = (genero == undefined || genero.lenght == 0) ? "" : genero;
    email = (email == undefined || email.lenght == 0) ? "" : email;
    data_nascimento = (data_nascimento == undefined || data_nascimento.lenght == 0) ? "" : data_nascimento;
    cpf = (cpf == undefined || cpf.lenght == 0) ? "" : cpf;
    senha = (senha == undefined || senha.lenght == 0) ? "" : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? "" : confirmaSenha;
    telefone = (telefone == undefined || telefone.lenght == 0) ? "" : telefone;
    cep = (cep == undefined || cep.lenght == 0) ? "" : cep;
    rua = (rua == undefined || rua.lenght == 0) ? "" : rua;
    bairro = (bairro == undefined || bairro.lenght == 0) ? "" : bairro;
    cidade = (cidade == undefined || cidade.lenght == 0) ? "" : cidade;    

    return cadastroPaciente = {
        nome,
        genero,
        email,
        data_nascimento,
        cpf,
        senha,
        confirmaSenha,
        telefone,
        cep,
        rua,
        bairro,
        cidade
    }

}

function loginPaciente(req, res)  {

    var email = req.flash("email");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return email;

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

function cadastroProfissional(req, res) {

    var email = req.flash("emailCPr");
    var genero = req.flash("generoCPr");
    var nome = req.flash("nomeCPr");
    var data_nascimento = req.flash("data_nascimentoCPr");
    var cpf = req.flash("cpfCPr");
    var senha = req.flash("senhaCPr");
    var confirmaSenha = req.flash("confirmaSenhaCPr");
    var telefone = req.flash("telefoneCPr");
    var cep = req.flash("cepCPr");
    var rua = req.flash("ruaCPr");
    var bairro = req.flash("bairroCPr");
    var cidade = req.flash("cidadeCPr");

    nome = (nome == undefined || nome.lenght == 0) ? "" : nome;
    genero = (genero == undefined || genero.lenght == 0) ? "" : genero;
    email = (email == undefined || email.lenght == 0) ? "" : email;
    data_nascimento = (data_nascimento == undefined || data_nascimento.lenght == 0) ? "" : data_nascimento;
    cpf = (cpf == undefined || cpf.lenght == 0) ? "" : cpf;
    senha = (senha == undefined || senha.lenght == 0) ? "" : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? "" : confirmaSenha;
    telefone = (telefone == undefined || telefone.lenght == 0) ? "" : telefone;
    cep = (cep == undefined || cep.lenght == 0) ? "" : cep;
    rua = (rua == undefined || rua.lenght == 0) ? "" : rua;
    bairro = (bairro == undefined || bairro.lenght == 0) ? "" : bairro;
    cidade = (cidade == undefined || cidade.lenght == 0) ? "" : cidade;    

    return cadastroProfissional = {
        nome,
        genero,
        email,
        data_nascimento,
        cpf,
        senha,
        confirmaSenha,
        telefone,
        cep,
        rua,
        bairro,
        cidade
    }

}

function loginProfissional(req, res)  {

    var email = req.flash("emailLPr");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return email;

}

function esqueciSenhaPaciente(req, res)  {

    var email = req.flash("emailESP");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return email;

}

function redefinirSenhaPaciente(req, res) {

    var senha = req.flash("senhaRSP");
    var confirmaSenha = req.flash("confirmaSenhaRSP");

    senha = (senha == undefined || senha.lenght == 0) ? undefined : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? undefined : confirmaSenha;

    
    return redefinirSenhaPaciente = {
        senha,
        confirmaSenha
    }
    
}

function esqueciSenhaProfissional(req, res)  {

    var email = req.flash("emailESPr");
    email = (email == undefined || email.lenght == 0) ? "" : email;

    return email;

}

function redefinirSenhaProfissional(req, res) {

    var senha = req.flash("senhaRSPr");
    var confirmaSenha = req.flash("confirmaSenhaRSPr");

    senha = (senha == undefined || senha.lenght == 0) ? undefined : senha;
    confirmaSenha = (confirmaSenha == undefined || confirmaSenha.lenght == 0) ? undefined : confirmaSenha;

    
    return redefinirSenhaProfissional = {
        senha,
        confirmaSenha
    }
    
}

module.exports = {
    cadastroPaciente,
    loginPaciente,
    cadastroAdmin,
    loginAdmin,
    cadastroProfissional,
    loginProfissional,
    esqueciSenhaPaciente,
    redefinirSenhaPaciente,
    esqueciSenhaProfissional,
    redefinirSenhaProfissional
}