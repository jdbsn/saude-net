const nodemailer = require("nodemailer");
var fs = require("fs");
var ejs = require("ejs");
var path = require("path")

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "496251ce76b03a",
      pass: "d59f4304613f90"
    }
  });

function esqueciSenhaPaciente(email, token) {

    ejs.renderFile(path.join(__dirname + "/../views/email/esqueciSenhaPaciente.ejs"), { token }, function (err, pag) {
         
        if (err) {
            console.log(err);
        } else {

            transporter.sendMail({
                from: "SaúdeNet <496251ce76b03a>",
                to: email,
                subject: "Esqueci minha senha | SaúdeNet",
                html: pag
            }).then(message => {
                console.log(message)
            }).catch(err => {
                console.log(err)
            });

        }
                
    });

}

function esqueciSenhaProfissional(email, token) {

    ejs.renderFile(path.join(__dirname + "/../views/email/esqueciSenhaProfissional.ejs"), { token }, function (err, pag) {
         
        if (err) {
            console.log(err);
        } else {

            transporter.sendMail({
                from: "SaúdeNet <496251ce76b03a>",
                to: email,
                subject: "Esqueci minha senha | SaúdeNet",
                html: pag
            }).then(message => {
                console.log(message)
            }).catch(err => {
                console.log(err)
            });

        }
                
    });

}

module.exports = {
    esqueciSenhaPaciente,
    esqueciSenhaProfissional
}