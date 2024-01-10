import React, {createContext, useContext} from "react";
import CreateAccountInput from "./RegisterInput";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import SelectSex from "./SelectSex";

const FormikContext = createContext();

export const useFormikContext = () => {
  return useContext(FormikContext);
};

export default function Register () {
  // const handleSubmit = (values) => {
  //   alert(JSON.stringify(values, null, 2))
    
  // }  
  //TODO poprawić ten formularz

  const formik = useFormik({
    initialValues: {
      email:"",
      name:"",
      surname:"",
      dateOfBirth:"",
      password:"",
      sex:""
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
      .max(new Date(), 'Date of birth cannot be in the future')
      .test(
        'is-adult',
        'You must be at least 18 years old',
        function (value) {
          const today = new Date();
          const minimumAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          
          return value <= minimumAgeDate;
        }
        )
        .required('Date of birth is required'),
        
        password: Yup.string()
        .min(5, "Must be at least 5 characters")
        .max(100, "Seriously, You want to remember more than 100 characters?")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required("Required"),

        sex: Yup.string()
        .oneOf(['male', 'female'], 'Invalid option')
        .required("Podaj swoją płeć")
      }),
    onSubmit: values => {
      // handleSubmit(values)
      alert(JSON.stringify(values, null, 2))
      
    }
  });
  
  return (
    <FormikContext.Provider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <CreateAccountInput name="email" type="email"/>
        <CreateAccountInput name="name" type="text"/>
        <CreateAccountInput name="surname" type="text"/>
        <CreateAccountInput name="password" type="text"/>
        <CreateAccountInput name="dateOfBirth" type="date"/>
        <SelectSex/>
        <button type="reset" onClick={() => formik.resetForm()}>Reset</button>
        <button type="submit">Submit</button>
      </form>
    </FormikContext.Provider>
  )

}