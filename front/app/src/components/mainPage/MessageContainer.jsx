import React, { createContext, useContext, useState } from "react";
import RelationsToAccept from "./RelationsToAccept";
import ConversationContainer from "./ConversationContainer";

const ActRelationContext = createContext();
export const useActRelationContext = () => {
  return useContext(ActRelationContext);
};

export default function MessageContainer() {
  const [relationID, setRelationID] = useState(0);

  const updateRelationID = (newValue) => {
    setRelationID(newValue);
    console.log(relationID)
  };

  return (
    <div id="MessageContainer">
      <ActRelationContext.Provider value={[relationID, updateRelationID]}>
        <RelationsToAccept />
        <ConversationContainer />
        
      </ActRelationContext.Provider>
    </div>
  );
}


