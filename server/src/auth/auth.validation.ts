import * as Joi from 'joi'

export const authValidationSchema = Joi.object({
  email: Joi.string().required().min(1).max(200),
  password: Joi.string().required().min(1).max(200),
})
