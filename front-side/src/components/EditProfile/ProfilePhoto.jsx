import React from "react";

export default function ProfilePhoto ({src = ''}) {
  
  if (src != '') {
    return (
        <img src={src} alt="Zdjęcie profilowe"/> 
  )
} else {
  return (
   <img src='https://i.pinimg.com/564x/c3/8d/05/c38d056926ef67e44cfe0b047500bf2c.jpg'
   alt="Brak zdjęcia profilowego, wyświetlono placeholder"/> 
  )
}
}