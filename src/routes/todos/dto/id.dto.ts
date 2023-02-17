import Joi from "joi";

export const idDTO = Joi.object({
  id: Joi.string().length(24).required(),
});
