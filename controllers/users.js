// Переменные
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SomethingWrongError = require('../errors/something-wrong-error');
const NotFoundError = require('../errors/not-found-error');

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        about: req.body.about,
        avatar: req.body.avatar,
      });
    })
    .then((user) => res.status(201).send({ data: user }, { message: 'Пользователь создан' }))
    .catch(next);
};

// Вход пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let userId = '';
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new SomethingWrongError('Проверьте правильность ввода учетных данных');
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new SomethingWrongError('Проверьте правильность ввода учетных данных');
      }
      const JWT_SECRET = 'f86fa1ca3730b0a770c44debf1cea55ae915f2bd9809cb5ae1239a1f6fc80314';
      const token = jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешный вход' })
        .end();
    })
    .catch(next);
};

// Получить всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// Получить своего пользователя
module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId, (err, user) => {
    try {
      if (err != undefined || user == undefined) {
        throw new NotFoundError('Пользователь с такий ID не найден');
      }
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
};

// Получить информацию пользователя
module.exports.updateUserInfo = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findById(userId)
    .then((user) => {
      if (user.id.toString() === userId) {
        User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
          .then((user) => res.send({ data: user }))
          .catch(() => errorServerSide(res));
      } else {
        return Promise.reject(new Error('У вас нет доступа к изменению чужих аккаунтов'));
      }
    })
    .catch(() => errorServerSide(res));
};

// Обновить аватар пользователя
module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findById(userId)
    .then((user) => {
      if (user.id.toSting() === userId) {
        User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
          .then((user) => res.send({ data: user }))
          .catch(() => errorServerSide(res));
      } else {
        return Promise.reject(new Error('У вас нет доступа к изменению чужих аккаунтов'));
      }
    })
    .catch(() => errorServerSide(res));
};
