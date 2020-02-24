const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const uuidv1 = require("uuid/v1");
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        hash_validation_account: DataTypes.STRING,
        account_is_valid: DataTypes.BOOLEAN
      },
      {
        sequelize: sequelize,
        tableName: "users"
      }
    );
  }
  /*static associate(models) {
    this.hasMany(models.Tag, {
      foreignKey: "user_id",
      as: "tags"
    });
    this.hasMany(models.Task, {
      foreignKey: "user_id",
      as: "taks"
    });
    this.hasMany(models.CategoriesCard, {
      foreignKey: "user_id",
      as: "categories_card"
    });
  }*/
}
module.exports = User;
