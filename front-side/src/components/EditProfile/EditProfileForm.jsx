import React from "react";
import { useFormikContext } from "./FormikContextProvider";
import EditProfileInput from "./EditProfileInput";
import SelectLookingFor from "./SelectLookingFor";

export default function EditProfileForm() {
  const {formik, getUserData} = useFormikContext();

  

  return (
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <EditProfileInput name={"name"} />
        <EditProfileInput name={"surname"} />
        <EditProfileInput name={"email"} type={"email"} />
        <EditProfileInput name={"dateOfBirth"} type={"date"} />
        <EditProfileInput name={"height"} type={"number"} />
        <EditProfileInput name={"degree"} />
        <EditProfileInput name={"city"} />
        <SelectLookingFor />
        <EditProfileInput name='aboutMe' type={'textarea'}/>
        <EditProfileInput name='image' />
        <div
        className="form-buttons"
        >

        <button
          type="reset"
          onClick={() => getUserData()}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
          Restet changes
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          Apply changes
        </button>
          </div>
      </form>
  );
}
