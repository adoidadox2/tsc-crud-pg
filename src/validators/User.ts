import { Joi } from "celebrate";

export default {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required().min(3),
  }),
};
