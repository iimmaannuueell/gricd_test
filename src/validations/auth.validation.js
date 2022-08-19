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


module.exports = {
    register,
    login,
};
