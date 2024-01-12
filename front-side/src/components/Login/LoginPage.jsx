// import LoginForm from "./LoginForm";
import React from "react";
import LoginDataForm from "./LoginDataForm";
import { useNavigate } from "react-router-dom";


export default function LoginPage () {
  const navigate = useNavigate();

  const goToRegisterPage = () => {
    navigate("/Register")
  }

  return (
    <div
    className="w-full max-w-xs">
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      onClick={()=> goToRegisterPage()}
      >Register</button>
      <LoginDataForm />

    </div>
    )
}