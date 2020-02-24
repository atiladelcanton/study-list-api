const { sequelize } = require("../src/zenCompany/models");

module.exports = () => {
  // Percorrer todas as models , envolvido em um Promisse.all para aguardar percorrer todas as Models dando truncate
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    })
  );
};
