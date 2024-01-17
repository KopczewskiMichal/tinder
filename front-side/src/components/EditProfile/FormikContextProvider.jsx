import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};
export const emptyUserData = {
  name: "",
  surname: "",
  email: "",
  dateOfBirth: new Date("01/01/1970"),
  height: 100,
  degree: "",
  city: "",
  lookingFor: "",
  aboutMe:"",
  image:""
};

export default function FormikContextProvider({ children }) {


  const [actUserData, setActUserData] = useState(emptyUserData);


  const {userID} = useParams();

  function getUserData() {
    axios
      .get(`http://localhost:8080/profiles/${userID}`)
      .then((res) => {
        console.log("Formik" + formik)
        const updatedUserData = { ...emptyUserData, ...res.data };
        setActUserData(updatedUserData);
        formik.setValues(updatedUserData);
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);


  const formik = useFormik(
    {
      initialValues: actUserData,
 
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        image: Yup.string().max(300, "It is too long"),
        dateOfBirth: Yup.date()
        .max(new Date(), "Date of birth cannot be in the future")
        .test(
          "is-adult",
          "You must be at least 18 years old",
          function (value) {
            const today = new Date();
            const minimumAgeDate = new Date(
              today.getFullYear() - 18,
              today.getMonth(),
              today.getDate()
            );
            return value <= minimumAgeDate;
          }
        )
        .required("Date of birth is required"),
        height: Yup.number()
          .min(100, "If Your height is too small, you are child")
          .max(250, "It is impossible to be higher than 250cm"),
        degree: Yup.string().max(100),
        city: Yup.string().max(50, "It is too long"),
        lookingFor: Yup.string().oneOf(["Long Relationship", "Frends", "FWB", "I don't know"], "Invalid option"),
        email: Yup.string()
        .email("Incorrect email")
        .min(1, "Must be at least 1 character")
        .max(60, "Must be max 60 characters")
        .required("Required"),
      }),
      onSubmit: (values) => {
        axios.put('http://127.0.0.1:8080/updateProfile', {userID: userID, ...values})
        .then((res) => {
          // console.log(res)
        })
        .catch((err) => alert(err))
      },
    }
    
    );

  return (
    <FormikContext.Provider value={{formik, getUserData}}>{children}</FormikContext.Provider>
  );
}
