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
    <div>
      <button
      onClick={()=> goToRegisterPage()}
      >Register</button>
      <LoginDataForm />

    </div>
    )
}