const { body, check } = require("express-validator");

class UserValidations {
  static idValidation() {
    return [check("id").isMongoId().withMessage("ID invalido.")];
  }
}

module.exports = UserValidations;
