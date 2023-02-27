import Joi from "joi";

const toDoValidationSchema = {
  _id: Joi.string(),
  title: Joi.string().required(),
  text: Joi.string(),
  priority: Joi.number().min(0).max(2).required(),
  isResolved: Joi.boolean()
};

export const fullToDoDTO = Joi.object(toDoValidationSchema);

export const partialToDoDTO = Joi.object(toDoValidationSchema)
  .fork(Object.keys(toDoValidationSchema), (schema) => schema.optional())
  .min(1);
