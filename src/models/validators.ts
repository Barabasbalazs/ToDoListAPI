import Joi from "joi";

const toDoValidationSchema = {
  title: Joi.string().required(),
  text: Joi.string().required(),
  priority: Joi.number().min(0).max(2).required(),
  isResolved: Joi.bool().required(),
};

export const fullToDoValidator = Joi.object(toDoValidationSchema);

export const partialToDoValidator = Joi.object(toDoValidationSchema)
  .fork(Object.keys(toDoValidationSchema), (schema) => schema.optional())
  .min(1);

export const isValueOfType = (value: any, type: string[]): boolean => {
  return type.includes(value);
};
