import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../src/App.css';
import { Routes, Route, Link } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import EditBook from "./components/EditBook";
import BookList from "./components/BookList";
import DeleteBook from "./components/DeleteBook";
import Home from "./components/Home";



function App() {
  return (
    <div className="App-body">
      <nav className="navbar nav-bar navbar-expand-lg bg-body-tertiary">
        <div className="container fs-4 text-danger">
          <Link to={"/"} className="nav-link">
            BOOKS PORTAL
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
          <div className="collapse nav-bar2 navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
               <Link to={"/create-book"} className="nav-link">
                  Create Book
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/book-list"} className="nav-link">
                  Book List
                </Link>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create-book" element={<CreateBook />} />
            <Route exact path="/edit-book/:id" element={<EditBook />} />
            <Route exact path="/book-list" element={<BookList />} />
            <Route exact path="/delete-book/:id" element={<DeleteBook />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
