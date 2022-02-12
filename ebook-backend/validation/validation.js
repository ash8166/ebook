const Joi = require("joi");

//validation for book schema
function validateBooksSchema(bookObj) {
  const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(3).required(),
    genre: Joi.string().valid(
      "Fantasy",
      "Literary",
      "Mystery",
      "Non-Fiction",
      "Science Fiction",
      "Thriller"
    ),
    review: Joi.number().integer().valid(1, 2, 3, 4, 5),
    favourite: Joi.number().integer().valid(0, 1),
  });
  return bookSchema.validate(bookObj);
}

module.exports = validateBooksSchema;
