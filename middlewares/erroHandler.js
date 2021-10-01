function cadastroPaciente(req, res) {

    var nomeError = req.flash("nomeError");
    var emailError = req.flash("emailError");
    var cpfError = req.flash("cpfError");
    var senhaError = req.flash("senhaError");
    var confirmaSenhaError = req.flash("confirmaSenhaError");
    var telefoneError = req.flash("telefoneError");

    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError;
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError;
    cpfError = (cpfError == undefined || cpfError.lenght == 0) ? undefined : cpfError;
    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    confirmaSenhaError = (confirmaSenhaError == undefined || confirmaSenhaError.lenght == 0) ? undefined : confirmaSenhaError;
    telefoneError = (telefoneError == undefined || telefoneError.lenght == 0) ? undefined : telefoneError;

    return cadastroPaciente = {
        nomeError,
        emailError,
        cpfError,
        senhaError,
        confirmaSenhaError,
        telefoneError
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

module.exports = {
    cadastroPaciente,
    loginPaciente,
    cadastroAdmin,
    loginAdmin
};