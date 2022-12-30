const { Router } = require("express");
const UserController = require("../controllers/UserController");

const route = Router();

const { isAuthenticatedUser } = require("../middlewares/Auth");

route.get("/", isAuthenticatedUser, UserController.getAllUsers);
route.get("/:id", UserController.getDetailsUser);

module.exports = route;
