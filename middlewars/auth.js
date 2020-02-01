const jwt = require('jsonwebtoken');
const NotHaveAccess = require('../errors/not-have-access');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    throw new NotHaveAccess('Доступ запрещен. Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    req.user = payload;
  } catch (err) {
    throw new NotHaveAccess('Доступ запрещен. Необходима авторизация');
  }

  next();
};
