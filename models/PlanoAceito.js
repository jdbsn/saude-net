const Sequelize = require("Sequelize");
const connection = require("../database/database");

const PlanoAceito = connection.define('plano_aceito', {
    idPlanoSaude: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idProfissional: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {tableName: 'plano_aceito'})

module.exports = PlanoAceito;