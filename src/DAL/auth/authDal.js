const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signUpUserModel = require("../../models/signUpUser");

require("dotenv").config();

module.exports = class AuthDal {
  constructor(db) {
    this.db = db;
  }

  async signUpUser(signUpData) {
    const user = await signUpUserModel.validateAsync(signUpData);
    const newUserToken = jwt.sign({ email: user.email }, process.env.HASHKEY); //
    user.password = await bcrypt.hash(user.password, 8);
    const newUserCreated = await this.db
      .collection("users")
      .insertOne({ token: newUserToken, ...user });

    return newUserToken;
  }

  async loginUser(loginData) {
    const user = await signUpUserModel.validateAsync(loginData);
    const dbUser = await this.db
      .collection("users")
      .findOne({ username: user.username });
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      dbUser.password
    );
    if (isPasswordMatch) {
      return dbUser.token;
    } else {
      throw new ValidationError("password and username do not match");
    }
  }
};
