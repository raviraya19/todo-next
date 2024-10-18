import * as Joi from 'joi'

export const taskValidationSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string().required().min(1).max(200),
  description: Joi.string().required().min(1).max(200),
  completed: Joi.boolean().required(),
})
