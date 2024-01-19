import axios from "axios";
import React from "react";

export default function LoadFromFile() {
  const sendProfileData = (data) => {
    axios
      .post("http://127.0.0.1/registerProfileFromFile", data)
      .then((res) => {
        console.log("Utworzono profil");
      })
      .catch((err) => {
        console.log(err);
        alert("Problems");
      });
  };

  const handleFileLoad = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
      };
      const data = reader.readAsText(file);
      sendProfileData(data);
      console.log(data);
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
