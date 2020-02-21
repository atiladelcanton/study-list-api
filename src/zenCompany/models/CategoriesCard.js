const { Model, DataTypes } = require("sequelize");
class CategoriesCard extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING
      },
      {
        sequelize,
        tableName: "categories_card"
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Task, { foreignKey: "category_card_id", as: "taks" });
  }
}

module.exports = CategoriesCard;
