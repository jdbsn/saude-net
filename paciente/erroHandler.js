function signUpErros(req, res) {

    var nomeError = req.flash("nomeError");
    var emailError = req.flash("emailError");
    var cpfError = req.flash("cpfError");
    var senhaError = req.flash("senhaError");
    var verificaSenhaError = req.flash("verificaSenhaError");

    nomeError = (nomeError == undefined || nomeError.lenght == 0) ? undefined : nomeError;
    emailError = (emailError == undefined || emailError.lenght == 0) ? undefined : emailError;
    cpfError = (cpfError == undefined || cpfError.lenght == 0) ? undefined : cpfError;
    senhaError = (senhaError == undefined || senhaError.lenght == 0) ? undefined : senhaError;
    verificaSenhaError = (verificaSenhaError == undefined || verificaSenhaError.lenght == 0) ? undefined : verificaSenhaError;

    return erros = {
        nomeError,
        emailError,
        cpfError,
        senhaError,
        verificaSenhaError
    }

}

function loginErros(req, res) {

    var erro = req.flash("erro");
    erro = (erro == undefined || erro.lenght == 0) ? undefined : erro;

    return erro;
    
}

module.exports = {
    signUpErros,
    loginErros
};