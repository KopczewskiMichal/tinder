import React from "react";
import ProfileTile from "../mainPage/ProfileTile";
import { useFormikContext } from "./FormikContextProvider";

export default function RealTimeTile () {
  const {formik} = useFormikContext()

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  const age = calculateAge(formik.values.dateOfBirth)

  return (
    <div
      className="adapter"
    >

    <ProfileTile 
    profileData={[{...formik.values, age:age}]}/>
    </div>
  )
}