import { Joi } from "celebrate";

export default {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
