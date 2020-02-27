"use strict";

const service = require("../services/UserService");
const validatorUser = require("../requests/UserRequest");
module.exports = {
  async index(req, res, next) {
    try {
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
        res
          .status(404)
          .json({ message: "Usuário não encontrado", type: "info" });
      }
    } catch (e) {
      res.status(500).send({ message: "Falha ao obet o usuário", data: e });
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
    try {
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

      const { email, name, id } = await service.store(req.body);

      res.status(201).json({
        user: { id: id, email: email, name: name },
        message:
          "Usuário cadastrado com sucesso. Você recebera um e-mail com um token para validar a integridade do seu cadastro",
        type: "success"
      });
    } catch (e) {
      res
        .status(500)
        .send({ message: "Falha ao cadastrar o usuário", data: e });
    }
  },

  async validateAccount(req, res, next) {
    try {
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
    } catch (e) {
      res.status(500).send({ message: "Falha ao validar a conta", data: e });
    }
  },

  async edit(req, res, next) {
    try {
      const { id } = req.params;

      let user = await service.getById(id);

      if (!user) {
        res
          .status(404)
          .json("Usuário não encontrado")
          .end();
        return;
      }
      return res
        .status(200)
        .json({ user: user })
        .send();
    } catch (e) {
      res
        .status(500)
        .send({ message: "Falha ao obter os dados  do usuário", data: e });
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;

      let user = await service.getById(id);

      if (!user) {
        res
          .status(404)
          .json("Usuário não encontrado")
          .end();
        return;
      }
      let userUpdated = await service.update(req.params.id, req.body);

      return res
        .status(200)
        .json({ user: userUpdated })
        .send();
    } catch (e) {
      res
        .status(500)
        .send({ message: "Falha ao atualizar o usuário", data: e });
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      let user = await service.getById(id);

      if (!user) {
        res
          .status(404)
          .json("Usuário não encontrado")
          .end();
        return;
      }

      await service.delete(id);
      res
        .status(200)
        .json("Usuário removido com sucesso")
        .send();
    } catch (e) {
      res.status(500).send({ message: "Falha ao remover o usuário", data: e });
    }
  }
};
