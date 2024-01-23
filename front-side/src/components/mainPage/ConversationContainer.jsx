import axios from "axios";
import React, { useEffect, useState } from "react";
import { useActRelationContext } from "./MessageContainer";
import { useParams } from "react-router-dom";

export default function ConversationContainer () {
 const [conversationHistory, setConversationHistory] = useState([]);
 const { userID } = useParams();

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


    return (
      <div id="ConversationContainer">
        {relationID === 0 ? (
          <p className="text-xl font-bold">Działa</p>
        ) : (
          <>
            {conversationHistory.length === 0 ? (
              <p className="text-xl font-bold">Write first message</p>
            ) : (
              <div className="space-y-4">
                {conversationHistory.map((elem, index) => (
                  <div
                    className={`message p-4 rounded-lg shadow-md ${
                      elem.userID === userID ? 'ml-auto bg-blue-300' : 'mr-auto'
                    }`}
                    key={index}
                    style={{ maxWidth: '70%' }}
                  >
                    <span className="font-semibold">
                      {elem.userID === userID ? "Me: " : "Friend: "}
                    </span>
                    <p>{elem.text}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
    </div>
    
);

    
}