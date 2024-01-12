import React, {createContext, useContext} from "react";
import FormInput from "./FormInput";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};

export default function LoginDataForm () {
  //TODO ciasteczko

  const formik = useFormik({
    initialValues: {
      email:"",
      password:""
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email("Incorrect email")
      .min(1, "Must be at least 1 character")
      .max(60, "Must be max 60 characters")
      .required("Required"),
      password: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(100, "Seriously, You want to remember more than 100 characters?")
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol')
      .required("Required"),
    }),
    onSubmit: values => {
      axios.post("http://localhost:8080/Login", values)
      .then(function (response) {
        alert(response.data)
      })
      .catch(function (error) {
        alert(error)
      });
    }
  });
  
  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <FormInput name="email" type="email"/>
        <FormInput name="password" type="password"/>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>
    </FormikContext.Provider>
  )

};
