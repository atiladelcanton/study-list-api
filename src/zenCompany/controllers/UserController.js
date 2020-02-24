"use strict";

const service = require("../services/UserService");
const validatorUser = require("../requests/UserRequest");
module.exports = {
  async index(req, res, next) {
    let validator = validatorUser.validateEmail(req.body);
    if (!validator.isValid()) {
      res
        .status(400)
        .json(validator.errors())
        .end();
      return;
    }
    const user = await service.getUserByEmail(req.body.email);

    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(404).json({ message: "Usuário não encontrado", type: "info" });
    }
  },

  async getByEmail(req, res, next) {
    let validator = validatorUser.validateEmail(req.body);
    if (!validator.isValid()) {
      res
        .status(400)
        .json(validator.errors())
        .end();
      return;
    }
    const user = await service.getUserByEmail(req.body.email);
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(404).json({ message: "Usuário não encontrado", type: "info" });
    }
  },

  async store(req, res, next) {
    let validator = validatorUser.validate(req.body);
    if (!validator.isValid()) {
      res
        .status(400)
        .send(validator.errors())
        .end();
      return;
    }

    const user = await service.emailExist(req.body.email);

    if (user) {
      res
        .status(200)
        .json({
          message: "E-mail já cadastrado na base de dados",
          type: "info"
        })
        .end();
      return;
    }

    const { email, name } = await service.store(req.body);

    res.status(201).json({
      user: { email: email, name: name },
      message:
        "Usuário cadastrado com sucesso. Você recebera um e-mail com um token para validar a integridade do seu cadastro",
      type: "success"
    });
  },

  async validateAccount(req, res, next) {
    let validator = validatorUser.validateAccount(req.body);
    if (!validator.isValid()) {
      res
        .status(400)
        .json(validator.errors())
        .send();
      return;
    }

    const user = await service.emailExist(req.body.email);

    if (!user) {
      res
        .status(400)
        .json({
          message: "E-mail inválido",
          type: "info"
        })
        .send();
      return;
    }

    const ret = await service.validateAccount(req.body.email, req.body.token);

    if (ret) {
      res
        .status(200)
        .json({ message: "Conta validada com sucesso", type: "success" });
    } else {
      res.status(500).json({
        message: "Ocorreu um erro ao validar a conta",
        type: "danger"
      });
    }
  }
};
