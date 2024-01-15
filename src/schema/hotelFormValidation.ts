import Joi from "joi";

const createHotelSchema = Joi.object({
  userId: Joi.number().required(),
  hotelname: Joi.string().required(),
  location: Joi.string().required(),
  established: Joi.date().required(),
  singleroom: Joi.number().required(),
  singleroomrate: Joi.number().required(),
  doubleroom: Joi.number().required(),
  doubleroomrate: Joi.number().required(),
  suite: Joi.number().required(),
  suiterate: Joi.number().required(),
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneno: Joi.number().required(),
  image1: Joi.string().required(),
});

const updateHotelSchema = Joi.object({
  userId: Joi.number().required(),
  hotelname: Joi.string().required(),
  location: Joi.string().required(),
  established: Joi.date().required(),
  singleroom: Joi.number().required(),
  singleroomrate: Joi.number().required(),
  doubleroom: Joi.number().required(),
  doubleroomrate: Joi.number().required(),
  suite: Joi.number().required(),
  suiterate: Joi.number().required(),
  website: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneno: Joi.number().required(),
  image1: Joi.string().required(),
  createdat: Joi.date().required(),
});

export { createHotelSchema,updateHotelSchema };
