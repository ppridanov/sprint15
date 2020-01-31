class InternalServerError extends Error {
  constructor() {
    super('Произошла ошибка, обратитесь к администратору');
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
