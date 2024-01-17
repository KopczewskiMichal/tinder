import React from "react";
import ProfileTile from "../mainPage/ProfileTile";
import { useFormikContext } from "./FormikContextProvider";

export default function RealTimeTile () {
  const {formik} = useFormikContext()

  return (
    <ProfileTile profileData={[formik.values]}/>
  )
}