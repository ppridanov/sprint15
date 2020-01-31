const jwt = require('jsonwebtoken');
const NotHaveAccess = require('../errors/not-have-access');

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;
  const JWT_SECRET = 'f86fa1ca3730b0a770c44debf1cea55ae915f2bd9809cb5ae1239a1f6fc80314';
  if (!cookie) {
    throw new NotHaveAccess('Доступ запрещен. Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(cookie, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throw new NotHaveAccess('Доступ запрещен. Необходима авторизация');
  }

  next();
};
