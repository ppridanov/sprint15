// Объявление переменной
const Card = require('../models/card');
const InternalServerError = require('../errors/internal-server-error');
const NotHaveAccess = require('../errors/not-have-access');
const NotFoundError = require('../errors/not-found-error');


// Создание карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => {
      if (!card) {
        throw new InternalServerError();
      }
      res.send(card);
    })
    .catch(next);
};

// Удаление карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card.owner.toString() === ownerId) {
        throw new NotHaveAccess();
      }
      Card.findByIdAndRemove(cardId)
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Не найден идентификатор с таким ID');
          }
          res.send({ data: card });
        })
        .catch(next);
    })
    .catch(next);
};

// Получить все карточки
module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((card) => {
      if (!card) {
        throw new InternalServerError();
      }
      res.send({ data: card });
    })
    .catch(next);
};

// Получить одну карточку
module.exports.getCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId, (err, card) => {
    if (err != undefined || card == undefined) {
      next(new NotFoundError('Не найдена карточка'));
    }
    res.send(card);
  });
};

// Поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        throw new InternalServerError();
      }
      res.send({ data: like });
    })
    .catch(next);
};

// Удалить лайк карточке
module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((like) => {
      if (!like) {
        throw new InternalServerError();
      }
      res.send({ data: like });
    })
    .catch(next);
};
