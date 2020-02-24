"use strict";

const ValidatorContract = require("../validators/fluent-validator");

exports.validate = body => {
  let contract = new ValidatorContract();

  contract.isEmail(body.email, "E-mail inválido");

  contract.hasMinLen(
    body.password,
    8,
    "A Senha deve conter pelo menos 8 caracteres"
  );

  return contract;
};
exports.validateEmail = body => {
  let contract = new ValidatorContract();
  contract.isEmail(body.email, "E-mail inválido");

  return contract;
};

exports.validateAccount = body => {
  let contract = new ValidatorContract();
  contract.isEmail(body.email, "E-mail inválido");
  contract.isRequired(body.token, "Token não informado");
  return contract;
};
