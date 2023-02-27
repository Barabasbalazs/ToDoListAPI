import Joi from "joi";

const userValidationSchema = {
    email: Joi.string().email().required(),
    firstName: Joi.string().optional().allow(''),
    lastName: Joi.string().optional().allow(''),
    password: Joi.string().required(),
};

export const userDTO = Joi.object(userValidationSchema);