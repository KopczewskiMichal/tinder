import { FormikContext } from "formik";
import React from "react";
import EditProfileForm from "./EditProfileForm";

export default function EditProfilePage () {

  return (
    <FormikContext>
      <EditProfileForm />
    </FormikContext>
  )
}