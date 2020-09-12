const express = require("express");
require("dotenv").config();

const articleRouter = new express.Router();

articleRouter.get("/", async (req, res) => {
  try {
    const articles = await req.db.articleDal.getArticles(req.user);

    res.status(200);
    res.send(articles);
  } catch (e) {
    console.log(e);
    res.status(400);
    res.send("error");
  }
});

module.exports = articleRouter;
