import React from "react";
import { useFormikContext } from "./FormikContextProvider";

export default function SaveProfileToFile() {
  const formik = useFormikContext();

  const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = "profile.json";
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', () => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  
  const blob = new Blob([JSON.stringify(formik.formik.values)], { type: 'application/json' });
  

  return (
    <button
      className="save-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={() => saveFile(blob)}
    >
      Save Profile
    </button>
  );
}
