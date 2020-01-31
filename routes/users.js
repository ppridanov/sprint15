const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewars/auth');

const {
  createUser,
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  login,
} = require('../controllers/users');

router.get('/users', auth, getAllUsers);
router.get('/users/:userId', auth, getUser);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .label('Проверьте правильность введенного имени'),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: false },
      })
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
}), createUser);
router.patch('/users/me', auth, updateUserInfo);
router.patch('/users/me/avatar', auth, updateUserAvatar);
router.post('/signin', login);

module.exports = router;
