import React, { createContext, useContext, useEffect, useState } from "react";
import RelationsToAccept from "./RelationsToAccept";

const ActRelationContext = createContext();
export const useActRelationContext = () => {
  return useContext(ActRelationContext);
};

export default function MessageContainer() {
  const [relationIndex, setRelationIndex] = useState(0);

  const updateRelationIndex = (newValue) => {
    setRelationIndex(newValue);
    console.log(relationIndex)
  };

  return (
    <div id="MessageContainer">
      <ActRelationContext.Provider value={[relationIndex, updateRelationIndex]}>
        <RelationsToAccept />

      </ActRelationContext.Provider>
    </div>
  );
}


