import Joi from "joi";

// post validation (to add post) post here is meeting
const postValidate = Joi.object().keys({
  post_title: Joi.string().required(),
  post_desc: Joi.string().required(),
  post_link: Joi.string().required(),
});

// user validation (to attend meeting)
const userValidate = Joi.object().keys({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  link: Joi.string().required(),
});

export { postValidate, userValidate };
