const Joi = require("@hapi/joi");

const article = Joi.object({
  url: Joi.string(),
  imageUrl: Joi.string(),
  title: Joi.string(),
  date: Joi.date(),
  categories: Joi.array().items(Joi.string()),
  author: Joi.string(),
});

module.exports = article;
