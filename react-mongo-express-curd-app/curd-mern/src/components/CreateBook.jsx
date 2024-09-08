import React, { useEffect, useState } from "react";
import axios from "axios";
import './CreateBook.css';

function CreateBook() {
  const [userForm, setUserForm] = useState({
    title: "",
    description: "",
    name: "",
    price: 0,
  });

  const inputHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/books", userForm).then((res) => {
      console.log(res.data);
      setUserForm({
        title: "",
        description: "",
        name: "",
        price: 0,
      });
    });
  };

  useEffect(() => {}, []);
  return (
    <div>
      <div className=" container create-book form-wrapper mt-5 fs-5">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={userForm.name}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={userForm.title}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              id="description"
              value={userForm.description}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              id="price"
              value={userForm.price}
              onChange={inputHandler}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              BookSave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
