import http from "../http-common";

const getAllBooks = () => {
  return http.get("/books");
};

const get = (id) => {
  return http.get(`/books/${id}`);
};

const create = (data) => {
  return http.post("/books", data);
};

const update = (id, data) => {
  return http.put(`/books/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/books/${id}`);
};

const BookService = {
  getAllBooks,
  get,
  create,
  update,
  remove,
};

export default BookService;
