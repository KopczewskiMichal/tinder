import React from "react";
import LogOut from "../Login/LogOut";
import { useNavigate } from "react-router-dom";


export default function MainPage () {
  const navigate = useNavigate();
  const navigateToEditProfile = () => {
    navigate("/edit-profile")
  }

  return (
    <div>
      <LogOut />
      <button
      onClick={()=> navigateToEditProfile()}
      className="logout bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Edit Profile</button>
      <p>Strona w przygotowaniu</p>
    </div>
  )
}