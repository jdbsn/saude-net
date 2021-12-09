const Sequelize = require("Sequelize");
const connection = require("../database/database");

const Paciente = require("./Paciente");

const TokenPaciente = connection.define('token_paciente', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },token: {
        type: Sequelize.STRING,
        allowNull: false
    }, expiracao: {
        type: Sequelize.DATE,
        allowNull: false,
    }, idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {tableName: 'token_paciente'})

TokenPaciente.belongsTo(Paciente, { 
    foreignKey: 'idPaciente' });
Paciente.hasMany(TokenPaciente, { 
    foreignKey: 'idPaciente' });

TokenPaciente.sync({force: false}).then(()=> {});

module.exports = TokenPaciente;