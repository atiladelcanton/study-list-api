"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }, // 1-N
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      category_card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "categories_card", key: "id" }, // 1-N
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      data_delivery: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      finish: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  }
};
