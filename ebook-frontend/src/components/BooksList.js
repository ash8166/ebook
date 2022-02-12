import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BookDataService from "../services/BookService";
import { useTable, useSortBy } from "react-table";

const BooksList = (props) => {
  const history = useNavigate();
  const [books, setBooks] = useState([]);
  const booksRef = useRef();

  booksRef.current = books;

  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = () => {
    BookDataService.getAllBooks()
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openBook = (rowIndex) => {
    const id = booksRef.current[rowIndex].id;

    history("/books/" + id);
  };

  const deleteBook = (rowIndex) => {
    const id = booksRef.current[rowIndex].id;

    BookDataService.remove(id)
      .then((response) => {
        let newBooks = [...booksRef.current];
        newBooks.splice(rowIndex, 1);

        setBooks(newBooks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        sortType: "basic",
      },
      {
        Header: "Author",
        accessor: "author",
        sortType: "basic",
      },
      {
        Header: "Genre",
        accessor: "genre",
        sortType: "basic",
      },
      {
        Header: "Review",
        accessor: "review",
        sortType: "basic",
      },
      {
        Header: "Favourite",
        accessor: "favourite",
        sortType: "basic",
        Cell: (props) => {
          return props.value ? "Yes" : "No";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span
                style={{ marginRight: "5%" }}
                onClick={() => openBook(rowIdx)}
              >
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteBook(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: books,
      },
      useSortBy
    );

  return (
    <div className="list row">
      <div className="col-md-12">
        <Link to="/add" className="btn btn-sm createButton">
          Create Record
        </Link>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ textAlign: "center" }}
                  >
                    {column.render("Header")}
                    <span style={{ float: "right" }}>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} style={{ textAlign: "center" }}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksList;
