const { Router } = require("express");
const UserController = require("../controllers/UserController");

const route = Router();

const validate = require("../middlewares/HandleValidations");
const UserValidations = require("../middlewares/UserValidations");
const { isAuthenticatedUser } = require("../middlewares/Auth");
const AuthValidations = require("../middlewares/AuthValidations");

route.get("/", isAuthenticatedUser, UserController.getAllUsers);

route.get(
  "/:id",
  UserValidations.idValidation(),
  validate,
  UserController.getDetailsUser
);
/*route.post(
  "/editprofile",
  isAuthenticatedUser,
  UserController.updateProfileUser
);*/
route.put(
  "/",
  isAuthenticatedUser,
  AuthValidations.registerValidation(),
  validate,
  UserController.updateUser
);

route.put(
  "/follow/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  UserController.followUser
);

route.put(
  "/unfollow/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  UserController.unfollowUser
);

route.delete("/", isAuthenticatedUser, UserController.deleteUser);

module.exports = route;
