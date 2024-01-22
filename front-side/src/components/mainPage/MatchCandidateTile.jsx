import axios from "axios";
import React from "react";

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
    .put(`http://127.0.0.1:8080/acceptMatch`, payload)
    
  } 

  return (
    <div
    className="MatchCandidateTile " >
      <img
      className="rounded-full w-20"
      src={data.image} alt="Obraz użytkownika" />
      <h2
      className="text-xl font-bold"
      >{data.name}</h2>

      <div>
        <button
        onClick={() => handleAcceptMatch(true)}
        >✅</button>
        <button
        onClick={() => handleAcceptMatch(false)}
        >❌</button>
      </div>
    </div>
  )
}