import axios from "axios";
import React from "react";

export default function MatchCandidateTile (data) {
  data = data.data

 // TODO ogarnij to poiniżej
  const handleAcceptMatch = (opinion) => {
    axios
    .put(`http://127.0.0.1:8080/acceptMatch/${data._id}`)
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
        onClick={handleAcceptMatch}
        >✅</button>
      </div>
    </div>
  )
}