import { useFormikContext } from "./FormikContextProvider";
import React from "react";

export default function ProfilePhoto () {
  const formik = useFormikContext();
  const imagePath = formik.values.image;
  

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