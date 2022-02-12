import React, { useState } from "react";
import BookDataService from "../services/BookService";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const history = useNavigate();
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    genre: "",
    review: 1,
    favourite: 1,
  };
  const [book, setBook] = useState(initialBookState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      author: book.author,
      genre: book.genre,
      review: book.review,
      favourite: book.favourite,
    };

    BookDataService.create(data)
      .then((response) => {
        history("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="col-md-12">
      <div>
        <div className="form-row">
          <div className="form-group col-md-6 mt-4 mb-4">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={book.title}
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
              value={book.author}
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
                onChange={handleInputChange}
                id="no"
                value="0"
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
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor="yes">
                Yes
              </label>
            </div>
          </div>

          <button onClick={saveBook} className="btn submitButton">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
