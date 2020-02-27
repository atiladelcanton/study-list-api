"use strict";

const repository = require("../repositories/UserRepository");
const bcrypt = require("bcryptjs");
const uuidv1 = require("uuid/v1");

module.exports = {
  async findAll() {
    const users = await repository.getAll();

    return users;
  },
  async store(data) {
    const { name, email } = data;

    let hashedPassword = await bcrypt.hash(data.password, 8);
    let password = hashedPassword;
    let hash_validation_account = uuidv1();

    const user = await repository.store({
      name,
      email,
      password,
      hash_validation_account
    });

    if (!user) {
      throw new Error("User not created");
    }

    return user;
  },

  /**
   * Verify if e-mail exists
   *
   * @param {*} email
   * @returns boolean
   */
  async emailExist(email) {
    const user = await repository.emailExist(email);

    if (user != null) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * Get User By E-mail
   *
   * @param {*} email
   * @returns User
   */
  async getUserByEmail(email) {
    const user = await repository.emailExist(email);
    return user;
  },
  /**
   * Validate token account
   *
   * @param {*} email
   * @param {*} token
   * @returns boolean
   */
  async validateAccount(email, token) {
    let user = await repository.checkToken(email, token);
    if (user) {
      let ret = await repository.validToken(user.id);

      return true;
    }
    return false;
  },

  async getById(id) {
    let user = await repository.getById(id);

    if (user) {
      return user;
    } else {
      return false;
    }
  },

  /**
   *Update Register
   *
   * @param {*} id
   * @param {*} data
   * @returns
   */
  async update(id, data) {
    const user = await repository.update(id, data);

    return user;
  },

  async delete(id) {
    return await repository.delete(id);
  }
};
