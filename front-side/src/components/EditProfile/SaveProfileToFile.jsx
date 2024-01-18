import React from "react";
import { useFormikContext } from "./FormikContextProvider";

export default function SaveProfileToFile() {
  const formik = useFormikContext();

  const handleSaveJson = (data) => {
    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const saveFile = async (blob) => {
    const a = document.createElement('a');
    a.download = 'my-file.txt';
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', (e) => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };
  
  
  
  const obj = {hello: 'world'};
  const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
  

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      // onClick={() => handleSaveJson(formik.values)}
      onClick={() => saveFile(blob)}
    >
      Save Profile
    </button>
  );
}
