const { celebrate, Joi } = require('celebrate');

module.exports.newUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенного имени'),
    email: Joi.string()
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: false } })
      .label('Проверьте правильность введенного адреса электронной почты'),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{3,30}$/),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .label('Проверьте правильность введеного URL'),
  }),
});

module.exports.updateUserinfoValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенного имени'),
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
});

module.exports.updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(/^https?:\/\//)
      .label('Проверьте правильность введеного URL'),
  }),
});
