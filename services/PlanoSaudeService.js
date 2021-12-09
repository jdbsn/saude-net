const PlanoSaude = require("../models/PlanoSaude");

class PlanoSaudeService {

    async criar(nome) {
        try {
            await PlanoSaude.create({
                nome: nome
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async acharTodos() {
        try {
            return await PlanoSaude.findAll();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async acharUm(id) {
        try {
            return await PlanoSaude.findOne({where: {id: id}});
        } catch (err) {
            console.log(err);
            return undefined;
        }
    }

    async editar(id, nome) {
        try {
            await PlanoSaude.update({nome: nome}, {where: {id: id}});
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async apagar(id) {
        try {
            await PlanoSaude.destroy({where: {id: id}})
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

module.exports = new PlanoSaudeService();