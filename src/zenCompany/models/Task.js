const { Model, DataTypes } = require("sequelize");
class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        data_delivery: DataTypes.DATE,
        finish: DataTypes.BOOLEAN
      },
      {
        sequelize,
        tableName: "tasks"
      }
    );
  }
  static asssociate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user"
    });
    /**
     * Uma Task tem varias tags 1:N
     */
    this.belongsToMany(models.Tag, {
      foreignKey: "task_id",
      through: "task_tags",
      as: "tags"
    });
  }
}

module.exports = Task;
