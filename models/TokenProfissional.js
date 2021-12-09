const Sequelize = require("Sequelize");
const connection = require("../database/database");

const Profissional = require("./Profissional");

const TokenProfissional = connection.define('token_profissional', {
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
    }, idProfissional: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {tableName: 'token_profissional'})

TokenProfissional.belongsTo(Profissional, { 
    foreignKey: 'idProfissional' });
Profissional.hasMany(TokenProfissional, { 
    foreignKey: 'idProfissional' });

TokenProfissional.sync({force: false}).then(()=> {});

module.exports = TokenProfissional;