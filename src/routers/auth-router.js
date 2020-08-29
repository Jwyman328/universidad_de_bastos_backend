const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authRouter = new express.Router();
const signUpUserModel = require("../models/signUpUser");

authRouter.post("/sign_up", async (req, res) => {
  try {
    const signUpData = req.body;
    const newUserToken = await req.db.authDal.signUpUser(signUpData);

    res.status(201);
    res.send({ token: newUserToken });
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const user = await signUpUserModel.validateAsync(req.body);
    const userToken = await req.db.authDal.loginUser(req.body);

    res.status(200);
    res.send({ token: userToken });
  } catch (e) {
    console.log(e);

    if (e instanceof ValidationError) {
      res.status(401);
      res.send("username or password does not exist");
    }
    res.status(401);
    res.send("error");
  }
});

module.exports = authRouter;
