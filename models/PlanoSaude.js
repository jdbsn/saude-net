const Sequelize = require("Sequelize");
const connection = require("../database/database");

const PlanoSaude = connection.define('plano_saude', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {tableName: 'plano_saude'})

module.exports = PlanoSaude;