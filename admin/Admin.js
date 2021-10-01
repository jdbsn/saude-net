const Sequelize = require("sequelize");
const connection = require("../database/database");

    const Admin = connection.define('admin', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        }, nome: {
            type: Sequelize.STRING(60),
            allowNull: false
        }, email: {
            type: Sequelize.STRING(50),
            allowNull: false
        }, senha: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {freezeTableName: true});

module.exports = Admin;