import Joi from 'joi';

export default Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  comments: Joi.array().optional(),
  sharedWith: Joi.array().optional(),
});
