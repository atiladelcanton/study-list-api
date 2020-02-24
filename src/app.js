require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require("express");
const bodyParser = require("body-parser");

class AppController {
  constructor() {
    this.express = express();
    require("./database");
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.express.use(express.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }
  routes() {
    this.express.use("/", require("./routes/index"));
    this.express.use("/user", require("./routes/user-route"));
  }
}

module.exports = new AppController().express;
