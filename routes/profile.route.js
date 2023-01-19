const { Router } = require("express");
const ProfileController = require("../controllers/ProfileController");

const route = Router();

const { isAuthenticatedUser } = require("../middlewares/Auth");
const { imageUpload } = require("../utils/ImagesUploads");

route.put("/", isAuthenticatedUser, ProfileController.updateProfileUser);

route.put(
  "/avatar",
  isAuthenticatedUser,
  imageUpload.single("avatar"),
  ProfileController.updateProfileAvatar
);

route.put(
  "/backgound",
  isAuthenticatedUser,
  imageUpload.single("backgound"),
  ProfileController.updateProfileBackgound
);

module.exports = route;
