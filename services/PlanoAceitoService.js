const PlanoAceito = require("../models/PlanoAceito");

class PlanoAceitoService {

    async criar(idProfissional, listaPlanos) {
        PlanoAceito.create({id})
    }

}

module.exports = new PlanoAceitoService();