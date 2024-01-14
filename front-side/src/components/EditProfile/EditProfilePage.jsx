import React from "react";
import EditProfileForm from "./EditProfileForm";
import LogOut from "../Login/LogOut";
import { useNavigate } from "react-router-dom";
import FormikContextProvider from "./FormikContextProvider";
import ProfilePhoto from "./ProfilePhoto";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const navigateToMainPage = () => {
    navigate("/MainPage");
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
        <ProfilePhoto />
        </div>
      </FormikContextProvider>
    </div>
  );
}
