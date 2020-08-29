const jwt = require("jsonwebtoken");
const tokenModel = require("../models/token");

async function checkUserIsAuthenticated(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const tokenValidated = await tokenModel.validateAsync(token);
    const [jwt, restToken] = token.split("JWT ");
    const user = await req.db.collection("users").findOne({ token: restToken });
    const allUsers = await req.db.collection("users").find({}).toArray();
    req.user = user; // add the user to the request
    if (user) {
      next();
    } else {
      throw Error("no token");
    }
  } catch (error) {
    //console.log('what is error', error)
    res.status(401).send("error on authentication");
  }
}

module.exports = checkUserIsAuthenticated;
