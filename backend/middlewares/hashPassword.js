const { hashPassword } = require("../utils/password");

const hashPasswordMiddleware = async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
};

module.exports = hashPasswordMiddleware;
