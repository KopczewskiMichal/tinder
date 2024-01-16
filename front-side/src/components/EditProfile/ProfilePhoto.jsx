import React from "react";
import { useFormikContext } from "./FormikContextProvider";

export default function ProfilePhoto ({src = null}) {
  const formik = useFormikContext(); 
  let imagePath;
  if (src == null) {
    console.log("Wyciągnij mnie stąd!!!!")
    imagePath = formik.values.image;
  } else {
    imagePath = src
  }
  console.log("cześć, to ścieżka do zdjęcia profilowego", imagePath)
  

  return (
    <div
    className="profile-photo" 
    >
       {imagePath !== "" ? <img src={imagePath} alt="Zdjęcie profilowe"/> :
        <div
        className="bg-gray"
        ></div>}
    </div>
  )
}