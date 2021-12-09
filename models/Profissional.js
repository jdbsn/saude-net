const Sequelize = require("sequelize");
const connection = require("../database/database");

    const Profissional = connection.define('profissional', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING(60),
            allowNull: false
        }, email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        }, senha: {
            type: Sequelize.STRING,
            allowNull: false
        }, cpf: {
            type: Sequelize.STRING(14),
            allowNull: false,
            unique: true
        }, data_nascimento: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }, genero: {
            type: Sequelize.STRING(9),
            allowNull: false
        }, telefone: {
            type: Sequelize.STRING(15),
            allowNull: false
        }, rua: {
            type: Sequelize.STRING(40),
            allowNull: false
        }, bairro: {
            type: Sequelize.STRING(30),
            allowNull: false
        }, cep: {
            type: Sequelize.STRING(9),
            allowNull: false
        }, cidade: {
            type: Sequelize.STRING(35),
            allowNull: false
        }, estado: {
            type: Sequelize.STRING(2),
            allowNull: false
        }, tipo: {
            type: Sequelize.STRING(15),
            allowNull: false
        }, especialidade: {
            type: Sequelize.STRING(40),
            allowNull: false
        }, numero_conselho: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    }, {tableName: 'profissional'});

    module.exports = Profissional;

