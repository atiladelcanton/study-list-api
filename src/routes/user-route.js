"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../zenCompany/controllers/UserController");

router.get("/", controller.index);
router.get("/email", controller.getByEmail);
router.get("/validate-account", controller.validateAccount);
router.post("/", controller.store);
module.exports = router;
