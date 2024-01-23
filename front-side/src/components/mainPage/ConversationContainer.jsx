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
      <div className="conversation-window">
        {relationID === 0 ? (
          <p>Choose conversation</p>
        ) : (
          <>
            {conversationHistory.length === 0 ? (
              <p>Write first message</p>
            ) : (
              conversationHistory.map((elem, index) => (
                <div className="message" key={index}>
                  <span>
                    {elem.userID === userID ? "Me: " : "Friend: "}
                  </span>
                  <p>{elem.text}</p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
  
    
}