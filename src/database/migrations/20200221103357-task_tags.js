"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("task_tags", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      task_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tasks", key: "id" }, // 1-N
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" }, // 1-N
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
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
    return queryInterface.dropTable("task_tags");
  }
};
