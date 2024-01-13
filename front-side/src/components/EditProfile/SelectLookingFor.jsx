import React from "react";
import { useFormikContext } from "./FormikContextProvider";

export default function SelectLookingFor() {
  const formik = useFormikContext();

  const options = ["Long Relationship", "Frends", "FWB", "I don't know"];

  return (
    <div>
      <label
        htmlFor="lookingFor"
        className="text-gray-700 text-sm font-bold mb-2"
      >
        Looking for:
      </label>
      <select
  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-3 text-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
  id="lookingFor"
        name="lookingFor"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lookingFoor}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
