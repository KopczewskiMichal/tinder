import React from 'react';
import { useFormikContext } from "./Register"; //Gdyby nie ten input można by użyć FormInput bez kopiowania

export default function RegisterInput ({name, type}) {
  const formik = useFormikContext();

  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
          id={name}
          type={type}
          {...formik.getFieldProps(name)}
      />
      {formik.touched[name] && formik.errors[name] ? (
          <div>{formik.errors[name]}</div>
      ) : null}
    </div>
  )
}