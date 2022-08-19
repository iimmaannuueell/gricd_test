const Joi = require('joi');

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
                .min(6)
                .required(),
});


const login = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
                .min(6)
                .required(),
});



const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required()
});


const resetPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
    token: Joi.string().required().min(6)
});


module.exports = {
    register,
    login,
    forgotPasswordSchema,
    resetPasswordSchema,
};
