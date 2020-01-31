const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неверный формат почты.',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\//.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
},
{
  versionKey: false,
});

userSchema.post('save', (error, docs, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Такой почтовый ящик уже существует'));
  } else {
    next(error);
  }
});
module.exports = mongoose.model('user', userSchema);
