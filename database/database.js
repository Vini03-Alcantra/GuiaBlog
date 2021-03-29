const Sequelize = require('sequelize');

const {db} = require("../.env")

//const connection = new Sequelize('nodePainelAdministrativo', 'root', 'admin123456', {
const connection = new Sequelize(db.database, db.user, db.password, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection;