const User = require("../models/User");
const bcrypt = require("bcrypt");

class UserController {
  static getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.status(201).json({ users });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static getDetailsUser = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("-password");

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  // delete user - adm
  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(422).json({
          message: "usuario invalido",
        });
      }

      await user.remove();
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };
}

module.exports = UserController;
