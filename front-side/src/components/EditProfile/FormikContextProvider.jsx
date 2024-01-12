import React, { createContext, useContext, useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};

export default function FormikContextProvider ({children}) {
  const [actUserData, setActUserData] = useState({})

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(cookie => cookie.trim().startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  };
 
  const userID = getCookie("userID")

  function getUserData () {
    axios.get(`http://localhost:8080/profiles/${userID}`)
    .then((res) => {
      setActUserData(res.body)
      console.log(res.body)
    })
    .catch((error) => {
      alert(error)
    })
  } 
  
  useEffect(() => {
    getUserData()
  }, []);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Incorrect email")
        .min(1, "Must be at least 1 character")
        .max(60, "Must be max 60 characters")
        .required("Required"),
      
    }),
    onSubmit: (values) => {
      // TODO post na server
      console.log(values)
    },
  });

  return (
    <FormikContextProvider value={formik} >
      {children}
    </FormikContextProvider>
  )
}
