import Joi from "joi";

const queryValidationSchema = {
  sort: Joi.any().valid("createdAt", "text", "title", "priority").required(),
  order: Joi.any().valid("asc", "desc").required(),
  search: Joi.string(),
};

export const queryDTO = Joi.object(queryValidationSchema);
