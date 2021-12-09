const Sequelize = require ("sequelize");

    const connection = new Sequelize ('saudenet', 'root', '1234', {
        host: 'localhost',
        dialect: 'mysql',
        timezone: '-03:00',    
        define: {
            timestamps: false
        }
    });

module.exports = connection;