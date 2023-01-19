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

      if (!user) {
        return res.status(422).json({ message: "Usuário invalido" });
      }

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { name, username, email, password, confirmpassword } = req.body;
      const id = req.userId;

      const user = await User.findById(id);
      const userEmailExists = await User.findOne({ email });
      const userUsernameExists = await User.findOne({ username });

      if (user.email !== email && userEmailExists) {
        return res.status(422).json({ message: "Email em uso" });
      }

      if (user.username !== username && userUsernameExists) {
        return res.status(422).json({ message: "Nome do usuario em uso" });
      }

      if (password !== confirmpassword) {
        return res.status(422).json({ message: "As senhas não conferem" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      user.email = email;
      user.name = name;
      user.username = username;
      user.password = passwordHash;

      const newUser = await User.findByIdAndUpdate(id, user, {
        new: true,
      });

      res.status(200).json({ newUser });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const id = req.userId;

      const user = await User.findById(id);

      if (!user) {
        return res.status(422).json({
          message: "usuario invalido",
        });
      }

      await user.remove();
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static followUser = async (req, res) => {
    try {
      const id = req.userId; // Meu Id
      const idUser = req.params.id; // Bruno

      if (id === idUser) {
        return res.status(422).json({
          message: "Operação invalida",
        });
      }

      const followUser = await User.findById(id); // buscar following(Meu Id)
      const followingUser = await User.findById(idUser); // buscar followes(Bruno)

      // verificar se voce ja segue o usuario
      if (followUser.following.includes(idUser)) {
        return res.status(422).json({ message: "Voce ja segue estee usuario" });
      }

      // seguir usuario (Bruno)
      await followUser.updateOne({ $push: { following: idUser } });

      // adicionar id (Lucas) aos seguidores do (idUSer) Bruno
      await followingUser.updateOne({ $push: { followers: id } });

      res.status(200).json({ message: "Usuario seguido" });

      // seuidores - followingUser / followers
      // seguindo - followUser / following*/
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static unfollowUser = async (req, res) => {
    try {
      const id = req.userId;
      const idUser = req.params.id;

      if (id === idUser) {
        return res.status(422).json({
          message: "Operação invalida",
        });
      }

      const followUser = await User.findById(id); // buscar following(Meu Id)
      const followingUser = await User.findById(idUser); // buscar followes(Bruno)

      if (!followUser.following.includes(idUser)) {
        return res.status(422).json({ message: "Voce não segue este usuario" });
      }

      await followUser.updateOne({ $pull: { following: idUser } });
      await followingUser.updateOne({ $pull: { followers: id } });

      res.status(200).json({ message: "Usuario desguido" });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };
}

module.exports = UserController;
