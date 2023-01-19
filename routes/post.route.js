const { Router } = require("express");
const PostController = require("../controllers/PostController");

const { isAuthenticatedUser } = require("../middlewares/Auth");
const UserValidations = require("../middlewares/UserValidations");
const validate = require("../middlewares/HandleValidations");

const { imageUpload } = require("../utils/ImagesUploads");

const route = Router();

route.get("/", isAuthenticatedUser, PostController.getAllPosts);

route.get("/userpost", isAuthenticatedUser, PostController.getPostByUser);

route.get(
  "/timeline",
  isAuthenticatedUser,
  PostController.getPostsFromFollowers
);

route.get(
  "/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  PostController.getPostById
);

route.post(
  "/",
  isAuthenticatedUser,
  imageUpload.single("image"),
  PostController.createPost
);

route.put(
  "/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  imageUpload.single("image"),
  PostController.updatePost
);

route.delete(
  "/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  PostController.deletePost
);

route.put(
  "/like/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  PostController.likePost
);

route.put(
  "/comment/:id",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  PostController.commentPost
);

route.put(
  "/deletecomment/:id/:idComment",
  isAuthenticatedUser,
  UserValidations.idValidation(),
  validate,
  PostController.deleteCommentPost
);
module.exports = route;
