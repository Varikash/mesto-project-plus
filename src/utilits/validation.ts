import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import { isURL, isEmail } from 'validator';

export const urlValidation = {
  validator: (v: string) => isURL(v),
  message: (props: mongoose.ValidatorProps) => `${props.value} не корректный URL!`,
};

export const emailValidation = {
  validator: (v: string) => isEmail(v),
  message: (props: mongoose.ValidatorProps) => `${props.value} не является корректным email!`,
};

const joiUrlValidation = (value: any, helpers: Joi.CustomHelpers) => {
  if (!isURL(value)) {
    return helpers.error('string.url');
  }
  return value;
};

const joiEmailValidation = (value: any, helpers: Joi.CustomHelpers) => {
  if (!isEmail(value)) {
    return helpers.error('string.email');
  }
  return value;
};

export const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().custom(joiEmailValidation),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(joiUrlValidation),
  }),
});

export const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

export const newCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(joiUrlValidation),
  }),
});

export const profileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(joiUrlValidation).required(),
  }),
});
