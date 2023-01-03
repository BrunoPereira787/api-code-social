const jwt = require("jsonwebtoken");
const User = require("../models/User");

class Auth {
  static async isAuthenticatedUser(req, res, next) {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Acesso negado" });
    }

    const { id } = jwt.verify(token, process.env.API_APP_JWT_KEY);

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(500)
        .cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
        })
        .json({ message: "usuario invalido" });
    }

    req.userId = user.id;

    return next();
  }
}

module.exports = Auth;
