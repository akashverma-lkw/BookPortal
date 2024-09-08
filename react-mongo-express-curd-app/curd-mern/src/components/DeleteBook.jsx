import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteBook() {
  const [userForm, setUserForm] = useState({
    title: "",
    description: "",
    name: "",
    price: 0,
  });

  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .delete("http://localhost:8000/api/books/" + params.id)
      .then(() => {
        console.log("Data successfully deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/book-list");
  }, []);

  return (
    <div>
      <h2>Books deleted successfully</h2>
    </div>
  );
}

export default DeleteBook;
