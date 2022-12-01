const Database = require('../config/Database');
const Sequelize = require('sequelize');
const MySQLSequelize = new Sequelize(
    Database[0].database,
    Database[0].username,
    Database[0].password, {
    host: Database[0].host,
    port: Database[0].port,
    dialect: Database[0].dialect,
    logging: false

}
);

module.exports=MySQLSequelize;