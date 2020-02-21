const { Model, DataTypes } = require("sequelize");
class Tag extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize,
        tableName: "tags"
      }
    );
  }
  static asssociate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    /**
     * Uma Tag tem varias tasks 1:N
     */
    this.belongsToMany(models.Task, {
      foreignKey: "tag_id",
      through: "task_tags",
      as: "tasks"
    });
  }
}

module.exports = Tag;
