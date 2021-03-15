const Sequelize = require('sequelize');

const connection = new Sequelize('nodePainelAdministrativo', 'root', 'admin123456', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;