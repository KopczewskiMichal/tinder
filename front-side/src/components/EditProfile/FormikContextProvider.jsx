import React, { createContext, useContext, useEffect, useState } from "react";
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
  height: 0,
  degree: "",
  city: "",
  lookingFor: "",
  aboutMe:"",
  image:""
};

export default function FormikContextProvider({ children }) {


  const [actUserData, setActUserData] = useState(emptyUserData);

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) =>
      cookie.trim().startsWith(name + "=")
    );
    return cookie ? cookie.split("=")[1] : null;
  };

  const userID = getCookie("userID");

  function getUserData() {
    axios
      .get(`http://localhost:8080/profiles/${userID}`)
      .then((res) => {
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
        image: Yup.array().of(Yup.string().max(300, "It is too long")),
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
        lookingFor: Yup.string(),
        email: Yup.string()
        .email("Incorrect email")
        .min(1, "Must be at least 1 character")
        .max(60, "Must be max 60 characters")
        .required("Required"),
      }),
      onSubmit: (values) => {
        console.log(values)
      },
    }
    
    );

  return (
    <FormikContext.Provider value={formik}>{children}</FormikContext.Provider>
  );
}
