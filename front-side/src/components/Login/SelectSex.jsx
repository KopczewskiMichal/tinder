import React from "react";
import { useFormikContext } from "./Register"; //Gdyby nie ten input można by użyć FormInput bez kopiowania

export default function SelectSex() {
  const formik = useFormikContext();

  const options = ["male", "female"];

  return (
    <div>
      <label htmlFor="selectedOption">Select sex:</label>
      <select
        id="selectedOption"
        name="selectedOption"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.selectedOption}
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
