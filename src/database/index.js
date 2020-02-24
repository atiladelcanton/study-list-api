const Sequelize = require("sequelize");
const dbConfig = require("../config");
const User = require("../zenCompany/models/User");

const connection = new Sequelize(dbConfig);

User.init(connection);

//User.associate(connection.models);
module.exports = connection;
