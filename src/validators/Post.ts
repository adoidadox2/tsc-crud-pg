import { Joi } from "celebrate";

export default {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
};
