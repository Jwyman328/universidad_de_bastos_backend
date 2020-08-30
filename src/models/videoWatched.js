const Joi = require("@hapi/joi");

const videoWatched = Joi.object({
  userId: Joi.required(),
  videoUrl: Joi.string().required(),
  dateWatched: Joi.date().required(),
});

module.exports = videoWatched;
