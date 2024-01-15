import Joi from "joi";

const createFlightSchema = Joi.object({
  userId: Joi.number().required(),
  flightname: Joi.string().required(),
  flightdepart: Joi.string().required(),
  flightdest: Joi.string().required(),
  economy: Joi.number().required(),
  economyrate: Joi.number().required(),
  business: Joi.number().required(),
  businessrate: Joi.number().required(),
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneno: Joi.number().required(),
  image1: Joi.string().required(),
});

const updateFlightSchema = Joi.object({
  userId: Joi.number().required(),
  flightname: Joi.string().required(),
  flightdepart: Joi.string().required(),
  flightdest: Joi.string().required(),
  economy: Joi.number().required(),
  economyrate: Joi.number().required(),
  business: Joi.number().required(),
  businessrate: Joi.number().required(),
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneno: Joi.number().required(),
  image1: Joi.string().required(),
  createdat: Joi.date().required(),
});

export { createFlightSchema, updateFlightSchema };
