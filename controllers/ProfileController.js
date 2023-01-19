const User = require("../models/User");
const fs = require("fs").promises;
const path = require("path");

class ProfileController {
  static updateProfileUser = async (req, res) => {
    try {
      const id = req.userId;

      const newUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({ newUser });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static updateProfileAvatar = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(422).json({ message: "Operação invalida" });
      }

      const id = req.userId;

      const user = await User.findById(id);

      const uploadImages = path.resolve(
        __dirname,
        "..",
        "public",
        "images",
        "users"
      );

      if (user.avatar) {
        const UsersImages = path.join(uploadImages, user.avatar);
        const image = await fs.stat(UsersImages);

        if (image) {
          await fs.unlink(UsersImages);
        }
      }

      user.avatar = req.file.filename;

      await User.findByIdAndUpdate(id, user);

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static updateProfileBackgound = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(422).json({ message: "Operação invalida" });
      }

      const id = req.userId;

      const user = await User.findById(id);

      const uploadImages = path.resolve(
        __dirname,
        "..",
        "public",
        "images",
        "users"
      );

      if (user.backgound) {
        const UsersImages = path.join(uploadImages, user.backgound);
        const image = await fs.stat(UsersImages);

        if (image) {
          await fs.unlink(UsersImages);
        }
      }

      user.backgound = req.file.filename;

      await User.findByIdAndUpdate(id, user);

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };
}

module.exports = ProfileController;
