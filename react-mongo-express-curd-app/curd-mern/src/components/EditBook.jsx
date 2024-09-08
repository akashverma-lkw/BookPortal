import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditBook.css';

function EditBook() {
  const [userForm, setUserForm] = useState({
    title: "",
    description: "",
    name: "",
    price: 0,
  });

  let params = useParams();
  let navigate = useNavigate();

  const inputHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    console.log("Users " + userForm);
    axios
      .put("http://localhost:8000/api/books/" + params.id, {
        name: userForm.name,
        description: userForm.description,
        title: userForm.title,
        price: userForm.price,
      })
      .then((res) => {
        console.log({ status: res.status });
        navigate("/book-list");
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/books/" + params.id).then((res) => {
      console.log(res.data);
      setUserForm({
        name: res.data.name,
        title: res.data.title,
        description: res.data.description,
        price: res.data.price,
      });
    });
  }, []);

  return (
    <div className=" container edit-book form-wrapper mt-5">
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
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
            <button type="submit" className="btn btn1 text-light">
              Re-Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
