import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './BookList.css';

class BookList extends React.Component {
  constructor() {
    super();
    this.state = {
      userForm: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/books").then((response) => {
      const userForm = response.data;
      console.log(response.data);
      this.setState({ userForm });
    });
  }

  render() {
    return (
      <div className="container book-list form-wrapper mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {this.state.userForm.map((user) => (
              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.title}</td>
                <td>{user.description}</td>
                <td>{user.price}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm  me-2"
                    to={"/edit-book/" + user._id}
                  >
                    Edit
                  </Link>
                  <td className="pt-2"></td>
                  <Link
                    className="btn btn-danger btn-sm"
                    to={"/delete-book/" + user._id}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookList;
