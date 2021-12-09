function pacienteAuth (req, res, next) {
    if(req.session.paciente != undefined) {
        next();
    } else {
        res.redirect("/paciente/login")
    }
}

module.exports = pacienteAuth;