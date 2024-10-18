import * as Joi from 'joi'

export const userValidationSchema = Joi.object({
  id: Joi.number(),
  email: Joi.string().required().min(1).max(200),
  name: Joi.string().required().min(1).max(200),
  password: Joi.string().required().min(1).max(200),
  role: Joi.string().required().min(1).max(200),
})
