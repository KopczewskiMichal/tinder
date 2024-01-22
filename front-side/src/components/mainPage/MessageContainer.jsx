import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import RelationsToAccept from "./RelationsToAccept";

const ActRelationContext = createContext();
export const useActRelationContext = () => {
   return useContext(ActRelationContext)
}

export default function MessageContainer () {
  const [relationIndex, setRelationIndex] = useState(0)

  const updateRelationIndex = (newValue) => {
    setRelationIndex(newValue)
  }



return (
  <div
  id="MessageContainer"
  >

  <ActRelationContext.Provider value={[relationIndex, updateRelationIndex]}>
 <RelationsToAccept />

  </ActRelationContext.Provider>
  </div>

)
}



// TODO Zapytanie w bazie o Wiadomości użytkownika do trybu wyświetlenie tego po lewej i trochę wiadomości