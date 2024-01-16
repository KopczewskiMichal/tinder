import React from "react";
import LogOut from "../Login/LogOut";
import { useNavigate, useParams } from "react-router-dom";
import Candidates from "./Candidates";


export default function MainPage () {
  const { userID } = useParams();
  const navigate = useNavigate();
  const navigateToEditProfile = () => {
    navigate(`/edit-profile/${userID}`)
  }

  return (
    <div>
      <LogOut />
      <button
      onClick={()=> navigateToEditProfile()}
      className="logout bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >Edit Profile</button>

      <Candidates />
    </div>
  )
}