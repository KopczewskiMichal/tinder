import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const setup = require("./../../setup.json");

export default function DeleteProfile() {
  const navigate = useNavigate();
  const userID = useParams().userID

  function handleLogOut() {
    document.cookie = `userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/");
  }

  function handleDelete() {
    axios
      .delete(`http://${setup["server-ip"]}:8080/delete/${userID}`)
      .then((res) => {
        handleLogOut();
        console.log(res)
      })
      .catch((error) => {
        alert("There were some problems...");
      });
  }

  return (
    <button
      onClick={() => handleDelete()}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      DeleteProfile
    </button>
  );
}
