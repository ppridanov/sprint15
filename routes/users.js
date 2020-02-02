const router = require('express').Router();
const {
  newUserValidator,
  updateUserinfoValidator,
  updateUserAvatarValidator,
} = require('../middlewars/validator');
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
router.get('/users/me', auth, getUser);
router.post('/signup', newUserValidator, createUser);
router.patch('/users/me', auth, updateUserinfoValidator, updateUserInfo);
router.patch('/users/me/avatar', auth, updateUserAvatarValidator, updateUserAvatar);
router.post('/signin', login);

module.exports = router;
