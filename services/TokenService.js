const TokenPaciente = require("../models/TokenPaciente");
const PacienteService = require("../services/PacienteService");

const TokenProfissional = require("../models/TokenProfissional");
const ProfissionalService = require("../services/ProfissionalService")

const Email = require("../modules/Email");

const { v4: uuidv4 } = require('uuid');
const moment = require("moment");

class TokenService {

    async criarTokenPaciente(email, req, res) {

        try {
            var paciente = await PacienteService.acharPorEmail(email);

            if(paciente == undefined) {
                var erroESP = "E-mail não encontrado.";
                req.flash("erroESP", erroESP);
                req.flash("emailESP", email);
                return {status: false}
            } else {

                const token = uuidv4();
                const expiracao = moment().add(15, 'm');

                await TokenPaciente.create({
                    token: token,
                    idPaciente: paciente.id,
                    expiracao: expiracao
                });

                Email.esqueciSenhaPaciente(email, token);

                var confirmacaoESP = "Email enviado."
                req.flash("confirmacaoESP", confirmacaoESP);

                return {status: true}

            }

        } catch (err) {
            console.log(err);
            return {status: false, erro: "Tente novamente."}
        }

    }

    async validarTokenPaciente (token) {

        try {

            var token = await TokenPaciente.findOne({where: {token: token}});

            if (token == undefined) {
                return {status: false, msg: "Token inválido."};
            } else {

                const agora = moment();

                if(agora.isAfter(token.expiracao)) {
                    return {status: false, msg: "Token expirado."};
                } else {
                    return {status: true, token: token.token, idPaciente: token.idPaciente}
                }

            }

        } catch (err) {
            console.log(err);
            return false;
        }

    }

    async deletarTokenPaciente(token) {

        try {
            await TokenPaciente.destroy({where: {token: token}})
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    async criarTokenProfissional(email, req, res) {

        try {
            var profissional = await ProfissionalService.acharPorEmail(email);

            if(profissional == undefined) {
                var erro = "E-mail não encontrado.";
                req.flash("erroESPr", erro);
                req.flash("emailESPr", email);
                return {status: false}
            } else {

                const token = uuidv4();
                const expiracao = moment().add(15, 'm');

                await TokenProfissional.create({
                    token: token,
                    idProfissional: profissional.id,
                    expiracao: expiracao
                });

                Email.esqueciSenhaProfissional(email, token);

                var confirmacao = "Email enviado."
                req.flash("confirmacaoESPr", confirmacao);

                return {status: true}

            }

        } catch (err) {
            console.log(err);
            return {status: false, erro: "Tente novamente."}
        }

    }

    async validarTokenProfissional (token) {

        try {

            var token = await TokenProfissional.findOne({where: {token: token}});

            if (token == undefined) {
                return {status: false, msg: "Token inválido."};
            } else {

                const agora = moment();

                if(agora.isAfter(token.expiracao)) {
                    return {status: false, msg: "Token expirado."};
                } else {
                    return {status: true, token: token.token, idProfissional: token.idProfissional}
                }

            }

        } catch (err) {
            console.log(err);
            return false;
        }

    }

    async deletarTokenProfissional(token) {

        try {
            await TokenProfissional.destroy({where: {token: token}})
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

}

module.exports = new TokenService();