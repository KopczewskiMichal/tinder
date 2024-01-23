import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActRelationContext } from "./MessageContainer";

export default function ConversationContainer () {
 const [conversationHistory, setConversationHistory] = useState([]);

 const [relationID, updateRelationID] = useActRelationContext();

  const getConversationHistory = () => {
    if (relationID !== 0) {

      axios
      .get(`http://127.0.0.1:8080/getRelationMessages/${relationID}`)
      .then(res => setConversationHistory(res.data))
    }
  }

  useEffect(()=>{
      getConversationHistory();
  }, [relationID])

    console.log("przeładowano elemne")
    console.log(conversationHistory)

    return (
      <div id="ConversationContainer">
        <div className="conversation-window">
          {conversationHistory.length === 0 ? (
            <p>Choose conversation.</p>
          ) : (
            conversationHistory.map((elem, index) => (
              <div className="message" key={index}>
                <p>{elem.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
    
}