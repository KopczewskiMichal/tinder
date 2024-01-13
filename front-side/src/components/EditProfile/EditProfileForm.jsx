import { Formik } from "formik";
import React, { createContext, useContext } from "react";
import { useFormikContext } from "./FormikContextProvider";
import EditProfileInput from "./EditProfileInput";
import SelectLookingFor from "./SelectLookingFor";

export default function EditProfileForm() {
  const formik = useFormikContext();

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <EditProfileInput name={"name"} type={"text"} />
        <EditProfileInput name={"surname"} type={"text"} />
        <EditProfileInput name={"email"} type={"email"} />
        <EditProfileInput name={"height"} type={"number"} />
        <EditProfileInput name={"degree"} type={"text"} />
        <EditProfileInput name={"city"} type={"text"} />
        <SelectLookingFor />

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
      </form>
    </div>
  );
}
