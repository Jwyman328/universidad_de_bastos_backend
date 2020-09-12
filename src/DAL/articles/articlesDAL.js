const { ObjectId } = require("mongodb"); // or ObjectID
const note = require("../../models/notes");

module.exports = class ArticleDAL {
  constructor(db) {
    this.db = db;
  }

  async getArticles(username) {
    const articles = await this.db
      .collection("articles")
      .find({})
      .sort({ date: 1 })
      .toArray();

    return articles;
  }
};
