const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const route = Router();

const validate = require("../middlewares/HandleValidations");
const UserValidations = require("../middlewares/UserValidations");

route.post(
  "/register",
  UserValidations.registerValidation(),
  validate,
  AuthController.register
);

route.post(
  "/login",
  UserValidations.loginValidation(),
  validate,
  AuthController.login
);

route.get("/logout", AuthController.logout);

module.exports = route;
