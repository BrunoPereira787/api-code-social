const jwt = require("jsonwebtoken");

const createUserToken = (user, req, res) => {
  const token = jwt.sign({ id: user._id }, process.env.API_APP_JWT_KEY, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("token", token, { maxAge: "3600000", httpOnly: true })
    .json({
      name: user.name,
      userId: user._id,
      token,
    });
};

module.exports = createUserToken;
