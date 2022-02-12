/*

*/

const express = require("express");
const router = express.Router();
const books = require("../services/books");

/* GET books listing. */
router.get("/api/books", function (req, res, next) {
  try {
    books.getAllBooks(res);
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* GET book by ID. */
router.get("/api/books/:id", function (req, res, next) {
  try {
    books.getBookByID(req, res);
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

/* DELETE book by ID. */
router.delete("/api/books/:id", function (req, res, next) {
  try {
    books.deleteBookByID(req, res);
  } catch (err) {
    console.error(`Error while deleting books `, err.message);
    next(err);
  }
});

/* DELETE all books */
router.delete("/api/books", function (req, res, next) {
  try {
    books.deleteAllBook(res);
  } catch (err) {
    console.error(`Error while deleting books `, err.message);
    next(err);
  }
});

/* CREATE Books */
router.post("/api/books", function (req, res, next) {
  try {
    books.createBook(req.body, res);
  } catch (err) {
    console.error(`Error while adding books `, err.message);
    next(err);
  }
});

/* Updated book by ID. */
router.put("/api/books/:id", function (req, res, next) {
  try {
    books.updateBook(req.body, req.params.id, res);
  } catch (err) {
    console.error(`Error while adding books `, err.message);
    next(err);
  }
});

module.exports = router;
