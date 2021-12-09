const Sequelize = require("Sequelize");
const connection = require("../database/database");
const Profissional = require("./Profissional");

const Vaga = connection.define('vaga', {
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
        type: Sequelize.STRING(5)
    }, intervalo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, idProfissional: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {tableName: 'vaga'})

Vaga.belongsTo(Profissional, { 
    foreignKey: 'idProfissional' });
Profissional.hasMany(Vaga, { 
    foreignKey: 'idProfissional' });

Vaga.sync({force: false}).then(()=> {});

module.exports = Vaga;