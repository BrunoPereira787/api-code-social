const User = require("../models/User");
const bcrypt = require("bcrypt");
const createUserToken = require("../utils/createUserToken");

class AuthController {
  static register = async (req, res) => {
    try {
      const { name, username, email, password, confirmpassword } = req.body;

      const usernameExists = await User.findOne({ username: username });

      if (usernameExists) {
        return res.status(422).json({
          message: "nome do usuário em uso",
        });
      }

      const userExists = await User.findOne({ email: email });

      if (userExists) {
        return res.status(422).json({
          message: "Email ja esta em uso",
        });
      }

      if (password !== confirmpassword) {
        return res.status(422).json({
          message: "A senha e a confirmação de senha precisam ser iguais",
        });
      }

      const passwrodHash = await bcrypt.hash(password, 12);

      const user = await User.create({
        name,
        username,
        email,
        password: passwrodHash,
      });

      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(422).json({
          message: "Usuário invalido",
        });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(422).json({ message: "Senha incorreta" });
      }

      createUserToken(user, req, res);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };

  static logout = async (req, res) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(200).json({ message: "logout realizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  };
}

module.exports = AuthController;
