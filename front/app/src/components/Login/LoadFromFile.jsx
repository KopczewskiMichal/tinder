import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const setup = require("./../../setup.json")

export default function LoadFromFile() {
  const navigate = useNavigate();

  const sendProfileData = (data) => {
    axios
      .post(`http://${setup["server-ip"]}:8080/registerProfileFromFile`, data)
      .then((res) => {
        navigate(`/mainPage/${res.data}`)
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  const handleFileLoad = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = JSON.parse(e.target.result);
        sendProfileData(fileContent);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="load-file">
      <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Create Profile From File
      </label>
      <input
        type="file"
        accept=".json"
        id="fileInput"
        onChange={handleFileLoad}
      />
      Load File
    </div>
  );
}
