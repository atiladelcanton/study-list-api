"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: process.env.API_NAME,
    version: process.env.API_VERSION,
    ambient: process.env.API_AMBIENT
  });
});

module.exports = router;
