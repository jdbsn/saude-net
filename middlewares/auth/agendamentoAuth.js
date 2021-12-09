function agendamentoAuth (req, res, next) {
    if(req.session.paciente != undefined) {
        next();
    } else {
        req.session.redirecionarPara = "/profissional/"+req.session.idProfissionalAgendamento;
        res.redirect("/paciente/login");
    }
}

module.exports = agendamentoAuth;