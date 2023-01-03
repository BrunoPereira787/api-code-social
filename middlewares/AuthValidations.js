const { body } = require("express-validator");

class AuthValidations {
  static registerValidation() {
    return [
      body("name").isString().withMessage("O nome é obrigatório."),
      body("username")
        .isString()
        .withMessage("O username é obrigatório.")
        .isLength({ min: 3 })
        .withMessage("O username precisa ter no mínimo 3 caracteres."),
      body("email")
        .isString()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Insira um e-mail válido"),
      body("password").isString().withMessage("A senha é obrigatória."),
      body("confirmpassword")
        .isString()
        .withMessage("A confirmação de senha é obrigatória."),
    ];
  }

  static loginValidation() {
    return [
      body("email").isString().withMessage("O e-mail é obrigatório."),
      body("password").isString().withMessage("A senha é obrigatória."),
    ];
  }
}

module.exports = AuthValidations;
