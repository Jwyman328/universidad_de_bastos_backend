const Joi = require("@hapi/joi");

const note = Joi.object({
  username: Joi.string().email().required(),
  videoTimeNoteTakenInSeconds: Joi.number(),
  videoId: Joi.string(),
});

module.exports = note;
