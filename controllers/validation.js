const Joi = require('joi');

const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    staffEmail: Joi.string().email({ minDomainAtoms: 2 }).required(),
    staffID: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
    admin: Joi.string().min(2).max(3).required(),
});

module.exports = { userSchema };