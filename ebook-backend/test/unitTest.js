let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
chai.should();
const API = "http://localhost:5000/api";
chai.use(chaiHttp);
let id;
describe("Books", () => {
  /*
   * Test the /GET route
   */
  describe("GET book", () => {
    it("it should GET all the books", (done) => {
      chai
        .request(API)
        .get("/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST book", () => {
    it("it should POST a book", (done) => {
      let book = {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Mystery",
        review: 1,
        favourite: 1,
      };
      chai
        .request(API)
        .post("/books")
        .send(book)
        .end((err, res) => {
          id = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully added!");
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe("/GET/:id book", () => {
    it("it should GET a book by the given id", (done) => {
      chai
        .request(API)
        .get("/books/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.have.property("title");
          res.body.data.should.have.property("author");
          res.body.data.should.have.property("genre");
          res.body.data.should.have.property("review");
          res.body.data.should.have.property("favourite");
          res.body.data.should.have.property("id").eql(id);
          done();
        });
    });
  });

  /*
   * Test the /put/:id route
   */
  describe("/PUT/:id book", () => {
    it("it should update a book by the given id", (done) => {
      let book = {
        title: "The Lord of the Rings III",
        author: "J.R.R. Tolkien",
        genre: "Mystery",
        review: 4,
        favourite: 1,
      };
      chai
        .request(API)
        .put("/books/" + id)
        .send(book)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully updated!");
          done();
        });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe("/DELETE/:id book", () => {
    it("it should DELETE a book given the id", (done) => {
      chai
        .request(API)
        .delete("/books/" + id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Book successfully deleted!");
          done();
        });
    });
  });
});
