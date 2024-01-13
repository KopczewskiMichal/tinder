import React, { createContext, useContext, useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};

export default function FormikContextProvider({ children }) {
  const emptyUserData = {
    name: "",
    surname: "",
    photos: [],
    birtDate: new Date("01-01-1970"),
    height: 0,
    interests: ["rolki", "Piłka"],
    degree: "",
    city: "",
    lookingFor: "",
    AboutMe:"",
    image:""
  };

  const [actUserData, setActUserData] = useState({});

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
      initialValues: { ...actUserData },
    },
    {
      validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        photos: Yup.array().of(Yup.string().max(300, "It is too long")),
        birthDate: Yup.date(),
        height: Yup.number()
          .min(100, "If Your height is too small, you are child")
          .max(250, "It is impossible to be higher than 250cm"),
        interests: Yup.array().of(
          Yup.string().max(50, "Your intersts is too long")
        ),
        degree: Yup.string().max(100),
        city: Yup.string().max(50, "It is too long"),
        lookingFor: Yup.string(),
      }),
      onSubmit: (values) => {
        // TODO post na server
        console.log(values);
      },
    }
  );

  return (
    <FormikContext.Provider value={formik}>{children}</FormikContext.Provider>
  );
}
