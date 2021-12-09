const Sequelize = require("Sequelize");
const connection = require("../database/database");
const Paciente = require("./Paciente");
const Profissional = require("./Profissional");

const Consulta = connection.define('consulta', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, data: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }, hora_inicio: {
        type: Sequelize.STRING(5),
        allowNull: false,
    }, hora_fim: {
        type: Sequelize.STRING(5),
        allowNull: false,
    }, anotacoes: {
        type: Sequelize.STRING(255)
    }, status: {
        type: Sequelize.ENUM('finalizado', 'agendado'),
        allowNull: false
    }, idPaciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, idProfissional: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {tableName: 'consulta'})

Consulta.belongsTo(Paciente, { 
    foreignKey: 'idPaciente' });
Paciente.hasMany(Consulta, { 
    foreignKey: 'idPaciente' });

Consulta.belongsTo(Profissional, { 
    foreignKey: 'idProfissional' })
Profissional.hasMany(Consulta, { 
    foreignKey: 'idProfissional' });

Consulta.sync({force: false}).then(()=> {});

module.exports = Consulta;