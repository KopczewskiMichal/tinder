import axios from "axios";
import React from "react";
import ProfilePhoto from "../EditProfile/ProfilePhoto";

export default function MatchCandidateTile (data) {
  data = data.data

 // TODO ogarnij to poiniżej
  const handleAcceptMatch = (opinion) => {
    const payload = {
      id: data._id,
      opinion: opinion
    }

    // TODO Obsługa co dalej po otrzymaniu odpowiedzi, pewnie usunięcie z tablicy elementu lub reload strony
    axios
    .put(`http://127.0.0.1:8080/confirmMatch`, payload)
    .then((result) => console.log(result))
    
  } 

  return (
    <div
    className="MatchCandidateTile" >
      {/* <img
      className="rounded-full w-20"
      src={data.image} alt="Obraz użytkownika" /> */}
       <ProfilePhoto src={data.image} className="rounded-full w-20 h-20"/>   
       <div
       className="rightSide"
       >

      <h2
      className="text-xl font-bold"
      >{data.name}</h2>

      <div className="MatchConfirmButtons">
        <button
        onClick={() => handleAcceptMatch(true)}
        >✅</button>
        <button
        onClick={() => handleAcceptMatch(false)}
        >❌</button>
      </div>
    </div>
        </div>
  )
}