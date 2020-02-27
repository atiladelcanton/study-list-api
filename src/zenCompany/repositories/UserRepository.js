"use strict";
const User = require("../models/User");
const { Op } = require("sequelize");

module.exports = {
  /**
   * Return all users
   * @returns User
   */
  async getAll() {
    const users = await User.findAll({
      attributes: ["name", "email", "account_is_valid"]
    });
    return users;
  },

  /**
   * Store User Database
   *
   * @param {*} data
   * @returns User
   */
  async store(data) {
    let user = await User.create(data);

    return user;
  },
  /**
   * Verify if e-mail exists
   *
   * @param {*} email
   * @returns User
   */
  async emailExist(email) {
    let user = await User.findOne({
      where: {
        email: {
          [Op.iLike]: email
        }
      }
    });

    return user;
  },

  async checkToken(email, token) {
    let user = await User.findOne({
      attributes: ["id", "hash_validation_account", "email"],
      where: {
        email: {
          [Op.iLike]: email
        },
        hash_validation_account: {
          [Op.iLike]: token
        },
        account_is_valid: {
          [Op.eq]: false
        }
      }
    });

    return user;
  },
  /**
   *
   * Set token to validate
   * @param {*} id
   * @returns
   */
  async validToken(id) {
    let user = await User.findByPk(id);
    user.hash_validation_account = "";
    user.account_is_valid = 1;
    return await user.save();
  },
  /**
   * Return User With ID
   *
   * @param {*} id
   * @returns
   */
  async getById(id) {
    let user = User.findByPk(id);

    return user;
  },
  /**
   *Update Register
   *
   * @param {*} id
   * @param {*} data
   * @returns
   */
  async update(id, data) {
    let user = await User.findByPk(id);
    return await user.save(data);
  },

  async delete(id) {
    let user = await User.findByPk(id);

    await user.destroy();
  }
};
