import React, { createContext, useContext } from "react";
import CreateAccountInput from "./RegisterInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectSex from "./SelectSex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      surname: "",
      dateOfBirth: "",
      password: "",
      sex: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Incorrect email")
        .min(1, "Must be at least 1 character")
        .max(60, "Must be max 60 characters")
        .required("Required"),

      name: Yup.string()
        .min(1, "Must be at least 1 character")
        .max(30, "Must be max 30 characters")
        .required("Required"),

      surname: Yup.string()
        .min(1, "Must be at least 1 character")
        .max(60, "Must be max 60 characters")
        .required("Required"),

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

      password: Yup.string()
        .min(5, "Must be at least 5 characters")
        .max(100, "Seriously, You want to remember more than 100 characters?")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("Required"),

      sex: Yup.string()
        .oneOf(["male", "female"], "There are only two genders")
        .required("Podaj swoją płeć"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/Register", values)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          alert("Nie udało sie utworzyć konta");
        });
    },
  });

  const goToRegisterPage = () => {
    navigate("/");
  };

  return (
    <div className="login-component  w-full max-w-xs">
      <button
        onClick={() => goToRegisterPage()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        Login
      </button>
      <FormikContext.Provider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <CreateAccountInput name="email" type="email" />
          <CreateAccountInput name="name" type="text" />
          <CreateAccountInput name="surname" type="text" />
          <CreateAccountInput name="password" type="password" />
          <CreateAccountInput name="dateOfBirth" type="date" />
          <SelectSex />
          <div className="flex items-center justify-between">
            <button
              type="reset"
              onClick={() => formik.resetForm()}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </FormikContext.Provider>
    </div>
  );
}
