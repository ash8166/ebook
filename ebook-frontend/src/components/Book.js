import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookService";
import { useParams, useNavigate } from "react-router-dom";

const Book = (props) => {
  const { id } = useParams();
  const history = useNavigate();
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    genre: "",
    review: 1,
    favourite: 1,
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);

  const getBook = (id) => {
    BookDataService.get(id)
      .then((response) => {
        setCurrentBook(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(id);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updateBook = () => {
    delete currentBook.id;
    BookDataService.update(id, currentBook)
      .then((response) => {
        history("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBook = () => {
    BookDataService.remove(id)
      .then((response) => {
        history("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="col-md-12">
      {currentBook ? (
        <div>
          <h4>Book</h4>
          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={currentBook.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              required
              value={currentBook.author}
              onChange={handleInputChange}
              name="author"
            />
          </div>

          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="genre">Genre</label>
            <select
              name="genre"
              id="inputState"
              className="form-control"
              value={currentBook.genre}
              onChange={handleInputChange}
            >
              <option value="Fantasy">Fantasy</option>
              <option value="Literary">Literary</option>
              <option value="Mystery">Mystery</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="review" style={{ marginRight: "7%" }}>
              Review
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="review"
                id="inlineRadio1"
                value="1"
                checked={currentBook.review === 1}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                1
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="review"
                id="inlineRadio2"
                value="2"
                checked={currentBook.review === 2}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                2
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="review"
                id="inlineRadio3"
                value="3"
                checked={currentBook.review === 3}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                3
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="review"
                id="inlineRadio4"
                value="4"
                checked={currentBook.review === 4}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio4">
                4
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="review"
                id="inlineRadio5"
                value="5"
                checked={currentBook.review === 5}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="inlineRadio5">
                5
              </label>
            </div>
          </div>

          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="favorites" style={{ marginRight: "5%" }}>
              Favorites
            </label>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="favourite"
                id="no"
                value="0"
                checked={currentBook.favourite === 0}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="no">
                No
              </label>
            </div>
            <div className="form-check form-check-inline ml-5">
              <input
                className="form-check-input"
                type="radio"
                name="favourite"
                id="yes"
                value="1"
                checked={currentBook.favourite === 1}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>
          </div>

          <button className="btn submitButton" onClick={deleteBook}>
            Delete
          </button>

          <button className="btn submitButton" onClick={updateBook}>
            Update
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
  );
};

export default Book;
