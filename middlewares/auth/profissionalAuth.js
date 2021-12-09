function profissionalAuth(req, res, next) {
    if(req.session.profissional != undefined) {
        next();
    } else {
        res.redirect("/profissional/login")
    }
}

module.exports = profissionalAuth;