import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddBook from "./components/AddBook";
import Book from "./components/Book";
import BookList from "./components/BooksList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark nav">
        <div className="navbar-nav mr-auto"></div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<BookList />} />
          <Route exact path="/add" element={<AddBook />} />
          <Route path="/books/:id" element={<Book />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
