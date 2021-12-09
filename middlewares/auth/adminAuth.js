function adminAuth (req, res, next) {
    if (req.session.admin != undefined) {
        next();
    } else {
        res.redirect("/admin/login")
    }
}

module.exports = adminAuth;