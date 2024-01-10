import React from "react";
import { useFormikContext } from "./Register";

export default function SelectSex() {
  const formik = useFormikContext();

  const options = ["male", "female"];

  return (
    <div>
      <label htmlFor="sex">Select sex:</label>
      <select
        id="sex"
        name="sex"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.sex} 
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
