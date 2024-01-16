import React from "react";
import { useFormikContext } from "./FormikContextProvider";

export default function ProfilePhoto ({src = null}) {
  const formik = useFormikContext(); 
  let imagePath;
  if (src == null) {
    imagePath = formik.values.image;
  } else {
    imagePath = src
  }
  

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