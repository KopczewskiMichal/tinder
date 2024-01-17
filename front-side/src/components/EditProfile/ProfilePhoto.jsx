import React from "react";

export default function ProfilePhoto ({src = null}) {
  
  return (
    <div
    className="profile-photo" 
    >
        <img src={src} alt="Zdjęcie profilowe"/> 

    </div>
  )
}