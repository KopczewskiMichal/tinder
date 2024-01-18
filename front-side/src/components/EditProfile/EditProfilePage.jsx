import React from "react";
import EditProfileForm from "./EditProfileForm";
import LogOut from "../Login/LogOut";
import { useNavigate, useParams } from "react-router-dom";
import FormikContextProvider from "./FormikContextProvider";
import RealTimeTile from "./RealTimeTile";
import DeleteProfile from "./DeleteProfile";
import SaveProfileToFile from "./SaveProfileToFile";


export default function EditProfilePage() {
  const { userID } = useParams();
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate(`/MainPage/${userID}`);
  };

  return (
    <div id="EditProfilePage">
      <nav>
        <LogOut />
        <button
          onClick={() => navigateToMainPage()}
          className="logout bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Main Page
        </button>
      </nav>
      <FormikContextProvider>
        <div
        className="main">
        <EditProfileForm />
        <RealTimeTile />
      <SaveProfileToFile />
        </div>
      </FormikContextProvider>

      <div
      className="buttons-container">

      <DeleteProfile />
      </div>
    </div>
  );
}
