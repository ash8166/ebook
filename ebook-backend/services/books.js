const db = require("../services/database");
const bookSchema = require("../validation/validation");

//get all the books present in the database
function getAllBooks(res) {
  var sql = "select * from books";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
}

// Get book by ID
function getBookByID(req, res) {
  var sql = "select * from books where id = ?";
  var params = [req.params.id];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!rows) rows = "Data not found";
    res.json({
      message: "success",
      data: rows,
    });
  });
}

//Delete book by ID
function deleteBookByID(req, res) {
  var sql = "DELETE FROM books WHERE id = ?";
  var params = [req.params.id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Book successfully deleted!", rows: this.changes });
  });
}

//Delete all books
function deleteAllBook(res) {
  var sql = "DELETE FROM books";
  var params = [];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ message: "Book successfully deleted!", rows: this.changes });
  });
}

// Create book
function createBook(bookObj, res) {
  // Check for validation
  let response = bookSchema(bookObj);
  if (response.error) {
    res.status(400).json({ error: response.error.details });
    return;
  }
  const { title, author, genre, review, favourite } = bookObj;
  var sql =
    "INSERT INTO books (title, author, genre, review, favourite) VALUES (?,?,?,?,?)";
  var params = [title, author, genre, review, favourite];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Book successfully added!",
      id: this.lastID,
    });
  });
}

//Updated book by ID
function updateBook(bookObj, id, res) {
  // Check for validation
  let response = bookSchema(bookObj);
  if (response.error) {
    res.status(400).json({ error: response.error.details });
    return;
  }
  const { title, author, genre, review, favourite } = bookObj;
  var sql = `UPDATE books set
    title = coalesce(?,title),
    author = coalesce(?,author),
    genre = coalesce(?,genre),
    review = coalesce(?,review),
    favourite= coalesce(?,favourite)
    WHERE id = ?`;
  var params = [title, author, genre, review, favourite, id];

  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "Book successfully updated!",
      data: result,
    });
  });
}

module.exports = {
  getAllBooks,
  getBookByID,
  deleteBookByID,
  createBook,
  updateBook,
  deleteAllBook,
};
