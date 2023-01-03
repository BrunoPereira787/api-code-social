const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const route = Router();

const validate = require("../middlewares/HandleValidations");
const AuthValidations = require("../middlewares/AuthValidations");

route.post(
  "/register",
  AuthValidations.registerValidation(),
  validate,
  AuthController.register
);

route.post(
  "/login",
  AuthValidations.loginValidation(),
  validate,
  AuthController.login
);

route.get("/logout", AuthController.logout);

module.exports = route;
