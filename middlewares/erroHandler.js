function cadastroPaciente(req, res) {

    var nomeError = req.flash("nomeErrorCP");
    var generoError = req.flash("generoErrorCP");
    var emailError = req.flash("emailErrorCP");
    var datanascimentoError = req.flash("datanascimentoErrorCP");
    var cpfError = req.flash("cpfErrorCP");
    var senhaError = req.flash("senhaErrorCP");
    var confirmaSenhaError = req.flash("confirmaSenhaErrorCP");
    var telefoneError = req.flash("telefoneErrorCP");
    var cepError = req.flash("cepErrorCP");
    var ruaError = req.flash("ruaErrorCP");
    var bairroError = req.flash("bairroErrorCP");
    var cidadeError = req.flash("cidadeErrorCP");

    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError;
    generoError = (generoError == undefined || generoError.lenght == 0) ? undefined : generoError;
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError;
    datanascimentoError = (datanascimentoError == undefined || datanascimentoError.lenght == 0) ? undefined : datanascimentoError;
    cpfError = (cpfError == undefined || cpfError.lenght == 0) ? undefined : cpfError;
    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;
    telefoneError = (telefoneError == undefined || telefoneError.lenght == 0) ? undefined : telefoneError;
    cepError = (cepError == undefined || cepError.lenght == 0) ? undefined : cepError;  
    ruaError = (ruaError == undefined || ruaError.lenght == 0) ? undefined : ruaError;  
    bairroError = (bairroError == undefined || bairroError.lenght == 0) ? undefined : bairroError;  
    cidadeError = (cidadeError == undefined || cidadeError.lenght == 0) ? undefined : cidadeError;  
    
    return cadastroPaciente = {
        nomeError,
        generoError,
        emailError,
        datanascimentoError,
        cpfError,
        senhaError,
        confirmaSenhaError,
        telefoneError,
        cepError,
        ruaError,
        bairroError,
        cidadeError
    }

}

function loginPaciente(req, res) {

    var erro = req.flash("erro");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

function cadastroAdmin(req, res) {

    var nomeError = req.flash("nomeError");
    var emailError = req.flash("emailError");
    var senhaError = req.flash("senhaError");
    var confirmaSenhaError = req.flash("confirmaSenhaError");

    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError;
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError;
    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;

    return cadastroAdmin = {
        nomeError,
        emailError,
        senhaError,
        confirmaSenhaError,
    }

}

function loginAdmin(req, res) {

    var erro = req.flash("erro");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

function cadastroProfissional(req, res) {

    var nomeError = req.flash("nomeErrorCPr");
    var generoError = req.flash("generoErrorCPr");
    var emailError = req.flash("emailErrorCPr");
    var datanascimentoError = req.flash("datanascimentoErrorCPr");
    var cpfError = req.flash("cpfErrorCPr");
    var senhaError = req.flash("senhaErrorCPr");
    var confirmaSenhaError = req.flash("confirmaSenhaErrorCPr");
    var telefoneError = req.flash("telefoneErrorCPr");
    var cepError = req.flash("cepErrorCPr");
    var ruaError = req.flash("ruaErrorCPr");
    var bairroError = req.flash("bairroErrorCPr");
    var cidadeError = req.flash("cidadeErrorCPr");

    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError;
    generoError = (generoError == undefined || generoError.lenght == 0) ? undefined : generoError;
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError;
    datanascimentoError = (datanascimentoError == undefined || datanascimentoError.lenght == 0) ? undefined : datanascimentoError;
    cpfError = (cpfError == undefined || cpfError.lenght == 0) ? undefined : cpfError;
    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;
    telefoneError = (telefoneError == undefined || telefoneError.lenght == 0) ? undefined : telefoneError;
    cepError = (cepError == undefined || cepError.lenght == 0) ? undefined : cepError;  
    ruaError = (ruaError == undefined || ruaError.lenght == 0) ? undefined : ruaError;  
    bairroError = (bairroError == undefined || bairroError.lenght == 0) ? undefined : bairroError;  
    cidadeError = (cidadeError == undefined || cidadeError.lenght == 0) ? undefined : cidadeError;  
    
    return cadastroProfissional = {
        nomeError,
        generoError,
        emailError,
        datanascimentoError,
        cpfError,
        senhaError,
        confirmaSenhaError,
        telefoneError,
        cepError,
        ruaError,
        bairroError,
        cidadeError
    }

}

function loginProfissional(req, res) {

    var erro = req.flash("erroLPr");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

function esqueciSenhaPaciente(req, res) {

    var erro = req.flash("erroESP");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

function redefinirSenhaPaciente(req, res) {

    var senhaError = req.flash("senhaErrorRSP");
    var confirmaSenhaError = req.flash("confirmaSenhaErrorRSP");

    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;

    
    return redefinirSenhaPaciente = {
        senhaError,
        confirmaSenhaError
    }
    
}

function esqueciSenhaProfissional(req, res) {

    var erro = req.flash("erroESPr");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

function redefinirSenhaProfissional(req, res) {

    var senhaError = req.flash("senhaErrorRSPr");
    var confirmaSenhaError = req.flash("confirmaSenhaErrorRSPr");

    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;

    
    return redefinirSenhaProfissional = {
        senhaError,
        confirmaSenhaError
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
};